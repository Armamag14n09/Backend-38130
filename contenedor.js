const fs= require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
      }
    
    save=async(producto)=>{
       try {
        if(fs.existsSync(this.archivo)){
           let productos= await this.getAll();
           if( productos.length>0){
           let lastiId=productos[productos.length-1].id+1
           let newProduct={
             id: lastiId,
            ...producto
           }
           productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        } else{
            let lastiId=1
            let newProduct={
              id: lastiId,
             ...producto
            }
            productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }
    
        } else{
            let newProduct={
            id:1,
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail
        }
         await fs.promises.writeFile(this.archivo,JSON.stringify([newProduct],null,2));
        return 1;
        }
        } catch (error) {
        console.log(error)
      }
  }

    async getAll() {
      try {
          if(fs.existsSync(this.archivo)){
          let info= await fs.promises.readFile(this.archivo, 'utf8');
          let result= JSON.parse(info);
          return result;
          }
          else{
            return "No se encontro el archivo"
          }  
      } catch (error) {
          console.log(error)
      }  
    }

    async getById(id) {
      try {
          if(fs.existsSync(this.archivo)){
            let info= await fs.promises.readFile(this.archivo, 'utf8');
              const dataId = JASON.parse(info).filter(item => item.id === id);
              if (dataId.length === 0) {
              throw new Error("No se encontro un producto con el id requerido");
              } else {
                  console.log(`Producto con id ${id} encontrado:\n`, dataId);
                  return dataId;
              }
          }
      } catch (error) {
          console.log(`Error buscando producto con el id: ${error.message}`);
      }
  }

  async deleteById(id) {
    try {
      if(fs.existsSync(this.archivo)){
        let info= await fs.promises.readFile(this.archivo, 'utf8');
            console.log(`Buscando producto con id requerido..`);
            if (JSON.parse(info).some(item => item.id === id)) {
                const data = await fs.promises.readFile(this.archivo);
                console.log(`Eliminando producto con id requerido..`);
                const datos = JSON.parse(data).filter(item => item.id !== id);
                await fs.promises.writeFile(this.archivo,JSON.stringify( datos,null,2));
                console.log(`Producto con id ${id} eliminado`);
            } else {
                throw new Error(`No se encontro el producto con el id ${id}`);
            }
        }
    } catch (error) {
        console.log(`Ocurrio un error al eliminar el producto con el id requerido: ${error.message}`);
    }
}

async deleteAll() {
    try {
        let nuevoArray = [];
        console.log(`Borrando datos..`);
        await fs.promises.writeFile(this.archivo, '[]');
        console.log(`Se borraron todos los datos del archivo ${this.archivo}`);
    } catch (error) {
        console.log(`Ocurrio un error eliminando los datos: ${error.message}`);
    }
}
}

module.exports = Contenedor