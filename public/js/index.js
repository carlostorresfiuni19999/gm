let contenedor;

const load = () => {

    contenedor = document.querySelector("#contenedor-cartas");
    const buff = [];

    obtenerLS();

    if(data.length > 0){
        buff.push('<div class="ms-2 me-2 cont mt-3" id ="contenedor-cartas">');
        for(let d of data){
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
    
    
}

