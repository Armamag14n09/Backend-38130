const Contenedor = require("./Contenedor.js")

//
const express = require ('express');
const aplicacion = express();
const port = 8080;

let contenedor= new Contenedor("productos.txt")

let producto1 ={
  "title": "monitor",
  "price": 1349,
  "thumbnail": "https://www.cyberpuerta.mx/img/product/XL/CP-DELL-E2016HV-1.jpg"

}
let producto2 ={
  "title": "cpu",
  "price": 6079,
  "thumbnail": "https://www.cyberpuerta.mx/img/product/XL/CP-INTEL-BX8071512600K-13913b.jpeg"

}
let producto3 ={
  "title": "gabinete",
  "price": 709,
  "thumbnail": "https://www.cyberpuerta.mx/img/product/XL/CP-ACTECK-AC-05008-1.jpg"

}
metodos=async()=>{

    console.log( await contenedor.save(producto1))
    console.log( await contenedor.save(producto2))
    console.log( await contenedor.save(producto3))
    console.log( await contenedor.getAll(3))
    await contenedor.getById(2)
    console.log( await contenedor.deleteById(3))
    //console.log( await contenedor.deleteAll(1))
}  
 metodos()  
 //let contenedor= new Contenedor("productos.txt")

 aplicacion.get('/productos', async (peticion, respuesta) => {
    const all= await contenedor.getAll();
    respuesta.json(all);
 });

 aplicacion.get('/productosRandom', async (peticion, respuesta) => {
  const all = await contenedor.getAll();
  const random = Math.floor(Math.random() * all.length);
  respuesta.json({
    random: random
  });
});

 const servidor = aplicacion.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
 });

 servidor.on('error', error => console.log(`Error: ${error}`));