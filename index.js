import fs from 'fs'

const PATH = "./Usuarios.json"

class ManagerUsuarios {

    constructor(path){
        path = this.path
    }

    consultarUsuarios = async () => {
        const data = await fs.promises.readFile(PATH, 'utf-8')
        
        const users = JSON.parse(data)

        return users
    }

    crearUsuario = async (usuario) => {
        
        usuario.id = 0
        const users = await this.consultarUsuarios()

        if(users.length === 0){
            usuario.id = 1
        }else{
            usuario.id = users[users.length-1].id+1
        }

        users.push(usuario)

        await fs.promises.writeFile(PATH, JSON.stringify(users, null, "\t"))

        return usuario
    }
}


const Usuarios = new ManagerUsuarios()

let  user = {
    nombre:"Julian",
    apellido: "Dubuisson",
    edad : 25,
    curso: "Backend"
}
