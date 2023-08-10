const { response } = require("express");

let idProducto = 4;
let idCategoria = 6;
{
    new Categoria(1, "postres"),
        new Categoria(2, "facturas"),
        new Categoria(3, "bebidas"),
        new Categoria(4, "panadería"),
        new Categoria(5, "cafetería")
}
let categorias = []
let data = [
    new Producto(1, "Budin", "Budin inglés", 24000, 1),
    new Producto(2, "Tarta", "Tarta de Frutilla", 15000, 1),
    new Producto(3, "Bollo", "Bollo de dulce de leche", 3500, 2)
];


const guardarCategorias = () => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
}


const obtenerCategorias = () => {
    categorias = JSON.parse(localStorage.getItem("categorias"));
    console.log(categorias);
}
const guardarIdProducto = () => {
    localStorage.setItem("id_p", JSON.stringify(idProducto));
}

const obtenerIdProducto = () => {
    idProducto = JSON.parse(localStorage.getItem("id_p"));
}

const guardarIdCategoria = () => {
    localStorage.setItem("id_c", JSON.stringify(idCategoria));
}

const obtenerIdCategoria = () => {
    idCategoria = JSON.parse(localStorage.getItem("id_c"));
}

const guardarLS = () => {
    localStorage.setItem("datas", JSON.stringify(data));
}

const obtenerLS = () => {
    let datos = localStorage.getItem("datas");
    data = JSON.parse(datos);
}

