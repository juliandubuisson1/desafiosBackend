import fs from 'fs'
const PATH = "./productos.json"

class ProductManager {
    constructor (){
        this.PATH = [];
        this.productos = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        for(let i = 0; i < this.PATH.length; i++){
            if (this.PATH [i].code === code){
                console.log(`El codigo ${code}, esta repetido`);
                break
            }
        }

        ProductManager.id++
        const newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id        
        }

        await fs.writeFile(this.PATH, JSON.stringify(this.productos))

        if(!Object.values (newProduct).includes(undefined)){
            ProductManager.id++;
            this.PATH.push({
                ...newProduct,
                id:ProductManager.id 
            });
        } else {
            console.log("Todos los campos son requeridos");
        }
    }

    getProduct(){
        return this.PATH;
    }

    idProduct (id) {
        return this.PATH.find((producto) => producto.id === id)
    }

    getProductById(id){
        !this.idProduct(id) ? console.log("Not Found") : console.log(this.idProduct(id));
    }

}

const productos = new ProductManager

//Llamada al array vacio
console.log(productos.getProduct());


//Agregar Productos
productos.addProduct('titulo1', 'descripcion1', 1500, 'imagen1', 'abc123', 5)
productos.addProduct('titulo2', 'descripcion2', 1500, 'imagen2', 'abc124',4)

//Llamada a los productos
console.log(productos.getProduct());

//Validacion de code repetido
productos.addProduct('titulo3', 'descripcion3', 1500, 'imagen3', 'abc124', 7)

//Busqueda de ID
productos.getProductById(2);

//Busqueda ID no encontrado
productos.getProductById(5);