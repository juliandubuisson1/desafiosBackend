import {promises as fs} from 'fs'
const PATH = './productos.json'


class ProductManager {

    constructor (){
        this.PATH = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) =>{
        

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

        this.PATH.push(newProduct)

        await fs.writeFile (PATH, JSON.stringify(this.PATH)) 
        
    };


    readProducts = async () => {
        let result = await fs.readFile(PATH, 'utf-8')
        return JSON.parse(result)
        
    }
    
    
    getProdcuts = async () => {
        let resultGetProducts = await this.readProducts()
        return console.log(resultGetProducts);
    }

    getProductsById = async (id) => {

        let resultProductById = await this.readProducts()
        if (!resultProductById.find (producto => producto.id === id)){
            console.log("ID no encontrado");
        }else {
            
            console.log(resultProductById.find(producto => producto.id === id));
        }
    }

    deleteProduct = async (id) => {
        let resultProductById = await this.readProducts();
        let productFilter = resultProductById.filter((products => products.id != id));
        await fs.writeFile(PATH, JSON.stringify(productFilter))
        console.log("El producto fue eliminado");
    }

    updateProduct = async (id, ...producto) => {
        await this.getProductsById(id);
        let productUpdate = await this.readProducts();
        let productoMod = [{id, ...producto}, ...productUpdate]
        await fs.writeFile(PATH, JSON.stringify(productoMod))
    };
}

const productos = new ProductManager()
/* productos.addProduct('Titulo1', 'Description1', 1000, 'Img1', '123abc', 5)
productos.addProduct('Titulo2', 'Description2', 2000, 'Img2', '456abc', 6) */

/* productos.getProdcuts() */

/* productos.getProductsById(2) */

/* productos.deleteProduct() */

/* productos.updateProduct({
    title: 'Titulo2',
    description:"Description2",
    price: 4500,
    thumbnail:'Img2', 
    code:'456abc',
    stock: 6,
    id:2
}) */

//LLAMADA AL ARRAY VACIO

console.log(productos.getProdcuts());

//AGREGAR PRODUCTOS 

productos.addProduct('titulo1', 'descripcion1', 1500, 'imagen1', 'abc123', 5)
productos.addProduct('titulo2', 'descripcion2', 1500, 'imagen2', 'abc124',4)
productos.addProduct('titulo3', 'descripcion3', 3500, 'imagen3', 'abc789', 3)
productos.addProduct('titulo4', 'descripcion4', 4500, 'imagen4', 'abc910',4)

//Validacion de code repetido
productos.addProduct('titulo3', 'descripcion3', 3500, 'imagen3', 'abc789', 3)

//BUSQUEDA DE ID

productos.getProductsById(2)

//BUSQUEDA DE ID NO ENCONTRADO

productos.getProductsById(8);


//ELIMINAR PRODUCTO

productos.deleteProduct()

//ACTUALIAR PRODUCTO

productos.updateProduct({
    title: 'Titulo2',
    description:"Description2",
    price: 4500,
    thumbnail:'Img2', 
    code:'456abc',
    stock: 6,
    id:2
})
