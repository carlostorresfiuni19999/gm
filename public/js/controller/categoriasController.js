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
const resetForm = () => {
    let formEdit = document.querySelector("#categoria-form-container-edit");
    formEdit.className = "hidden-form-cat";

    let form = document.querySelector("#categoria-form-container");
    form.className =  "container-fluid mt-2 d-flex justify-content-center display-form-cat";
    
}

const showFormEdit = (id, cat) => {

    let form = document.querySelector("#categoria-form-container");
    form.className = "hidden-form-cat";
    
    let formEdit = document.querySelector("#categoria-form-container-edit");
    let inputCategoriaEdit = document.querySelector("#categoria-edit");
    inputCategoriaEdit.value = cat;
    formEdit.className = "container-fluid mt-2 d-flex justify-content-center display-form-cat";
    

    const editar = async () => {
        showSpinner(spinnerCategorias);
        const peticion = await putHttp('http://localhost:3000/api/categorias', {
            id : id,
            data : {
                nombre : inputCategoriaEdit.value
            }
        }, "");

        offSpinner(spinnerCategorias);
        
        if(peticion == 200){
            await cargarCategorias();
            resetForm();
        } else if(peticion == 400){
            alert("Esa categoria ya se encuentra disponible");
        } else {
            alert("Ocurrio un error, verifica su conexion");
        }
        
        
    }
    validateForm("#categoria-form-container-edit", editar);

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
                        <button class="btn btn-outline-warning" onclick="showFormEdit('${val._id}', '${val.nombre}')"> 
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


