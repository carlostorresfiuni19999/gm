const loadProductoId = async () => {
    const id = localStorage.getItem("producto")
    await mostrarProductoId(id);
}

const mostrarProductoId = async (id) => {
    const peticion = await getHttp(`${URL_SERVER}/get`, "", id);

    console.log(peticion);

    if( peticion.status == 200){

        const buff = [];
        const imagen = peticion.data.imagen;
        const imgElement = document.querySelector('#img-prod');

        // Convertir los datos de la imagen a un blob
        const byteArray = new Uint8Array(imagen.data.data);
        const blob = new Blob([byteArray], { type: imagen.contentType });
    
        // Crear una URL para el blob y asignarla a la etiqueta <img>
        const blobUrl = URL.createObjectURL(blob);
        imgElement.src = blobUrl;

        buff.push('<div id="producto-por-id" class="col-sm-6">');
        buff.push(`<h2 class= "display-2 text-center"> ${peticion.data.nombre} </h2>`);
        buff.push(`<h3 class="display-3">Descripcion</h3>`);
        buff.push(`<h4 class="display-4">${peticion.data.descripcion} </h4>`);
        buff.push(`<h3 class="display-3">Precio</h3>`);
        buff.push(`<h4 class="display-4">${peticion.data.precio} </h4>`);
        buff.push(`<h3 class="display-3">Categoria</h3>`);
        buff.push(`<h4 class="display-4">
            ${peticion.data.categoria == null ? "sin asignar" : peticion.data.categoria.nombre}
         </h4>`);
        buff.push('</div>')

         document.querySelector('#producto-por-id').innerHTML = buff.join()
        
    }
}

