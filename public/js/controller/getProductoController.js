const loadProductoId = async () => {
    const id = localStorage.getItem("producto")
    await mostrarProductoId(id);
}

const mostrarProductoId = async (id) => {
    const peticion = await getHttp(`${URL_SERVER}/get`, "", id);

    console.log(peticion);

    if( peticion.status == 200){
        const imgElement = document.querySelector('#img-prod');
        const nombre = document.querySelector("#producto-nombre");
        const descripcion = document.querySelector("#producto-descripcion");
        const precio = document.querySelector("#producto-precio");
        const categoria = document.querySelector("#producto-categoria");
        const bcNombre = document.querySelector("#bc-nombre");
        const imagen = peticion.data.imagen;
        
        // Convertir los datos de la imagen a un blob
        const byteArray = new Uint8Array(imagen.data.data);
        const blob = new Blob([byteArray], { type: imagen.contentType });
    
        // Crear una URL para el blob y asignarla a la etiqueta <img>
        const blobUrl = URL.createObjectURL(blob);

        imgElement.src = blobUrl;
        nombre.innerHTML = peticion.data.nombre;
        descripcion.innerHTML = peticion.data.descripcion;
        precio.innerHTML = peticion.data.precio;
        categoria.innerHTML = peticion.data.categoria == null ? "Sin asignar" : peticion.data.categoria.nombre;
        bcNombre.innerHTML = peticion.data.nombre;

        
        
    }
}

