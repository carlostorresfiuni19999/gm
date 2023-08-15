let categoria;
let spinnerCategorias;

const load = () => {
    spinnerCategorias = document.querySelector("#spinner-categorias");
    cargarCategorias();
    validateForm("#categoria-form-container", guardar);
}

const borrar = async (id) => {
    const conf = confirm("Seguro que deseas borrar, esta accion es irreversible");
    if(conf){
        showSpinner(spinnerCategorias);
        const peticion = await deleteHttp("http://localhost:3000/api/categorias", "", id);
        offSpinner(spinnerCategorias);
        
        if(peticion)
            location.href = location.href;
        
    }
}



const guardar = async () => {
    showSpinner(spinnerCategorias);
    categoria = document.querySelector('#categoria').value;
    const peticion = await postHttp('http://localhost:3000/api/categorias', {
        nombre: categoria
    }, "");

    offSpinner(spinnerCategorias);

    switch(peticion) {
        case 200 : 
            alert("Guardado con exito");
            await cargarCategorias();
            break;
        case 400 :
            alert("Ya existe la categoria que deseas agregar");
            break;
        default :
            alert("Ocurrio un error al agregar la categoria");
            break;
    }
}

const editar = async ( id ) => {
    
    const error = document.querySelector(`#error-cat-edit-${id}`);

    const input = document.querySelector(`#categoria-edit-${id}`);

    if(input.value == null || input.value.trim().length < 1){
        error.className = "text-danger";
    } else {

        error.className = "oculto";
        const data = {
            id : id,
            data : {
                nombre : input.value
            }
        };
    
        showSpinner(spinnerCategorias);
        const peticion = await putHttp('http://localhost:3000/api/categorias', data , "");
        offSpinner(spinnerCategorias);

        if(peticion == 200){
            location.href = location.href;
        } else if(peticion == 400){
            alert("Esa categoria ya se encuentra disponible");
        } else {
            alert("Ocurrio un error, verifica su conexion");
        }
    } 
       
}


const cargarCategorias = async () => {
    showSpinner(spinnerCategorias);
    const buff = [];
    const categorias =  await getsHttp("http://localhost:3000/api/categorias", "");
    offSpinner(spinnerCategorias);
    if(categorias.status != 200) {
        alert("Ocurrio un error, verifique su conexion de internet.");
        
    } else {
        if(categorias.data && categorias.data.length > 0) {
            buff.push('<table class="table table-striped">');
            buff.push('<thead>')
            buff.push('<tr>')
            buff.push('<th scope = "col">#</th>');
            buff.push('<th scope = "col">Categorias</th>');
            buff.push('<th scope = "col">Acciones</th>');
            buff.push('</tr>');
            buff.push('</thead>')
            buff.push('<tbody>');
            let i = 0;
            for(let val of categorias.data){
                buff.push(
                `<tr>
                     <th scope = "row"> ${i} </td>
                     <td> ${val.nombre} </td>
                     <td>
                        <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modal-cat-edit-${val._id}"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button class="btn btn-outline-danger" onclick="borrar('${val._id}')"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </button>

                        <div class="modal fade" id="modal-cat-edit-${val._id}" tabindex="-1" aria-labelledby="label-cat-edit-${val._id}" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title text-center fs-5" id="label-cat-edit-${val._id}">Editar</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                    <div class="container-fluid mt-2" id="form-edit-${val._id}">
                                    <div>
                                        <input type="text" 
                                            class="form-control mb-1" 
                                            id="categoria-edit-${val._id}" 
                                            placeholder="Ingrese categoria"
                                            value = "${val.nombre}"  required />
                                        <p class="oculto" id ="error-cat-edit-${val._id}">
                                            Por favor, cargue una categoria
                                        </p>
                                        <div class = "btn-cat-edit-container mt-1">
                                            <button 
                                                type="button" 
                                                class="ms-2 btn btn-primary"
                                                id="categoria-btn-${val._id}"
                                                onclick="editar('${val._id}')"
                                                >Editar</button>
                                            <button 
                                                type="button" 
                                                class="ms-2 btn btn-outline-secondary"
                                                data-bs-dismiss="modal"
                                                id="categoria-btn-edit">Cancelar</button>
                                        </div>
                                    </div>
                                    </div>

                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </td>
                </tr>`
                     
                );
                i ++;           }
            buff.push('</tbody>')
            buff.push('</table>');
            
            let tabla = document.querySelector("#categoria-datos");
            tabla.innerHTML = buff.join("\n");
        }
    }
}


