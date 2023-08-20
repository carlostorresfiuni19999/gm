let contenedor;

const load = () => {


    /*
    if (data.length > 0) {
        buff.push('<div class="ms-2 me-2 cont mt-3" id ="contenedor-cartas">');
        for (let d of data) {
            buff.push(`
            <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="./img/budin.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${d.producto}</h5>
                    <p class="card-text">${d.descripcion}</p>
                    <h6 class="card-footer">${d.precio} Gs</h6>
                </div>
            </div>

        </div>
            `)
        }
        buff.push('</div>')

        contenedor.innerHTML = buff.join("\n");
        
    }
    */
   obtenerProductosLandingPage();

   setInterval(obtenerProductosLandingPage, 15000)
}

const obtenerProductosLandingPage = async () => {
    const productos = await getsHttp(`${URL_SERVER}/productos`, "");

    if (productos.status == 200) {
        contenedor = document.querySelector("#contenedor-cartas");

        for (let d of productos.data) {
            const imagen = d.imagen;
            const divCard = document.createElement('div');
            const imgNode = document.createElement('img');
            const divCardHeader = document.createElement('div');
            const divCardBody = document.createElement('div');
            const h5CardTextDescripcion = document.createElement('h5');
            const h6CardFooter = document.createElement('h6');

            
            const byteArray = new Uint8Array(imagen.data.data);
            const blob = new Blob([byteArray], { type: imagen.contentType });
        
            // Crear una URL para el blob y asignarla a la etiqueta <img>
            const blobUrl = URL.createObjectURL(blob);
            imgNode.src = blobUrl;

            divCard.className = "card me-1 mt-2 me-1";
            divCard.style ="width: 18rem;"
            divCardHeader.className = "card-header text-center";
            divCardHeader.innerHTML = d.nombre;
            imgNode.className = "card-img-top";
            divCardBody.className = "card-body";
            h5CardTextDescripcion.className = "card-title";
            h5CardTextDescripcion.innerHTML = d.descripcion;
            h6CardFooter.className = "card-footer";
            h6CardFooter.innerHTML = d.precio;

            divCardBody.append(h5CardTextDescripcion, h6CardFooter);
            divCard.append(divCardHeader, imgNode, divCardBody);
            contenedor.append(divCard);
            
            
        }
    }
}
