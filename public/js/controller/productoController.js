let spinnerProductos;


const loadProducts = () => {


    spinnerProductos = document.querySelector("#spinner-productos");
    getCategoriasSelect();
    setInterval(getCategoriasSelect, 30000);
    validateForm("#formProducto", guardarProducto);
    getProductosTable();
}

const getCategoriasSelect = async () => {
    const select = document.querySelector("#cat-select");
    const selectContainer = document.querySelector("#select-container");
    const catMsg = document.querySelector("#cat-msg");
    const buff = [];

    const categorias = await getsHttp(`${URL_SERVER}/categorias`, "");

    if (categorias.status != 200) {
        alert("Ocurrio un error al cargar las categorias, revisa su conexion");
        return;
    }

    if (categorias.data.length > 0) {
        catMsg.className = "oculto";
        selectContainer.className = "row mt-2";
        buff.push("<select id = `cat-select`>");

        for (let cat of categorias.data) {
            buff.push(`<option value = "${cat._id}"> ${cat.nombre} </option>`);
        }
        buff.push("</select>");

        select.innerHTML = buff.join("\n");
    } else {
        catMsg.className = "text-danger";
        selectContainer.className = "oculto";

    }
}


const guardarProducto = async () => {
    const errorImgReq = document.querySelector("#error-img-req");
    const errorImgFormat = document.querySelector("#error-img-format");
    const errorImgLen = document.querySelector("#error-img-len");

    const nombre = document.querySelector('#product').value;
    const descripcion = document.querySelector('#desc').value;
    const price = parseFloat(document.querySelector('#price').value);
    const catSelect = document.querySelector('#cat-select');
    const selectedCat = catSelect.options[catSelect.selectedIndex].value;
    const imagenInput = document.querySelector('#imagen');

    if (imagenInput.files[0]) {
        const allowedExtensions = ['.jpg', 'jpeg', '.png'];
        const fileExtension = imagenInput.files[0].name.toLowerCase().slice(-4);
        console.log(fileExtension); // Obtener la extensión

        if (!allowedExtensions.includes(fileExtension)) {
            errorImgFormat.className = "text-danger";
            return;
        }

        if (imagenInput.files.length > 1) {
            errorImgLen.className = "text-danger";
        } else {

            errorImgFormat.className = "oculto";
            errorImgLen.className = "oculto";
            errorImgReq.className = "oculto";

            const producto = new ProductoCreate(
                nombre, descripcion, price, selectedCat, imagenInput
            )

            const peticion = await postImg(`${URL_SERVER}/productos`, producto, '');

            switch (peticion) {
                case 200:
                    await getProductosTable();
                    break;

                case 404:
                    alert("Categoria no valida");
                    break;

                default:
                    alert("Error de conexion");
                    console.log("Ocurrio un error al guardar la imagen");
                    break;
            }

        }

    } else {
        errorImgReq.className = "text-danger";
    }
}


const verProducto = (id) => {
    localStorage.setItem("producto", id);
    location.href = '../../page/admin/cargarProducto.html';

}

const getProductosTable = async () => {
    showSpinner(spinnerProductos);
    const buff = [];
    const productos = await getsHttp(`${URL_SERVER}/productos`, "");
    console.log(productos);
    offSpinner(spinnerProductos);
    if (productos.status != 200) {
        alert("Ocurrio un error, verifique su conexion de internet.");

    } else {
        if (productos.data && productos.data.length > 0) {
            buff.push('<table class="table table-striped">');
            buff.push('<thead>')
            buff.push('<tr>')
            buff.push('<th scope = "col">#</th>');
            buff.push('<th scope = "col">Nombre</th>');
            buff.push('<th scope = "col">Descripcion</th>');
            buff.push('<th scope = "col">Categoria</th>');
            buff.push('<th scope = "col">Precio </th>');
            buff.push('</tr>');
            buff.push('</thead>')
            buff.push('<tbody>');
            let i = 0;
            for (let val of productos.data) {
                buff.push(
                    `<tr>
                     <th scope = "row"> ${i} </td>
                     <td> ${val.nombre} </td>
                     <td> ${val.descripcion} </td>
                     <td> ${val.categoria == null ? 'Sin asignar' : val.categoria.nombre} </td>
                     <td> ${val.precio} </td>
                     <td>
                        <button class = "btn btn-outline-info"
                        onclick = "verProducto('${val._id}')"
                        > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </button>
                        <button class="btn btn-outline-warning" 
                            onclick = "mostrarModalEditar(
                                '${val._id}', 
                                '${val.nombre}', 
                                '${val.descripcion}',
                                 ${val.precio},
                                 ${val.categoria}
                                 
                                 )"
                            data-bs-toggle="modal" data-bs-target="#modalEditarProd"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg> <p id="error-img-req" class="oculto">
                            Imagen es requerida
                        </p>
                        </button>
                        <button class="btn btn-outline-danger" onclick="borrarProducto('${val._id}')"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>`

                );
                i++;
            }
            buff.push('</tbody>')
            buff.push('</table>');

            let tabla = document.querySelector("#table-productos");
            tabla.innerHTML = buff.join("\n");
        }
    }

}

const borrarProducto = async (id) => {
    const verify = confirm("Estas seguro que deseas borrar?, esta accion es irreversible");

    if (verify) {
        showSpinner(spinnerProductos);
        const peticion = await deleteHttp(`${URL_SERVER}/productos`, '', id);
        offSpinner(spinnerProductos);

        if (peticion) {
            await getProductosTable();
        } else {
            alert("Ocurrio un error al borrar el producto, revisa su conexion");
        }

    }
}

const mostrarModalEditar = async (id, prod, desc, prec, cat, img) => {
    const productoEditar = document.querySelector("#productEdit");
    const descEdit = document.querySelector("#descEdit");
    const priceEdit = document.querySelector("#priceEdit");




    productoEditar.value = prod;
    descEdit.value = desc;
    priceEdit.value = prec;

    const editarProducto = async () => await editarProductoCallback(id); 
    
    validateForm("#formProdEditar", editarProducto);

}

const editarProductoCallback = async (id) => {
    const errorImgFormat = document.querySelector("#error-img-format-edit");
    const errorImgLen = document.querySelector("#error-img-len-edit");
    const select = document.querySelector("#cat-select-edit");
    const selectedCat = select.options[select.selectedIndex].value;
    const selectContainer = document.querySelector("#select-container-edit");
    const catMsg = document.querySelector("#cat-msg-edit");
    const imagenInput = document.querySelector('#imagen-edit');
    const buff = [];
    const categorias = await getsHttp(`${URL_SERVER}/categorias`, "");
    let catOrdenados = [...categorias.data];

    if (categorias.status != 200) {
        alert("Ocurrio un error al cargar las categorias, revisa su conexion");
        return;
    }

    if (categorias.data.length > 0) {
        const catFilter = categorias.data.filter(x => x != null && cat._id != x._id);


        if (catFilter.length != categorias.data.length)
            catOrdenados = [cat, ...catFilter];

        catMsg.className = "oculto";
        selectContainer.className = "row mt-2";
        buff.push("<select id = `cat-select`>");

        for (let cat of catOrdenados) {
            buff.push(`<option value = "${cat._id}"> ${cat.nombre} </option>`);
        }
        buff.push("</select>");

        select.innerHTML = buff.join("\n");
    } else {
        catMsg.className = "text-danger";
        selectContainer.className = "oculto";

    }


    if (imagenInput.files[0]) {
        const allowedExtensions = ['.jpg', 'jpeg', '.png'];
        const fileExtension = imagenInput.files[0].name.toLowerCase().slice(-4);
        console.log(fileExtension); // Obtener la extensión

        if (!allowedExtensions.includes(fileExtension)) {
            errorImgFormat.className = "text-danger";
            return;
        }

        if (imagenInput.files.length > 1) {
            errorImgLen.className = "text-danger";
            return;
        }

    }

    errorImgFormat.className = "oculto";
    errorImgLen.className = "oculto";

    const producto = new ProductoCreate(
        nombre, descripcion, price, selectedCat, imagenInput
    )

    const peticion = await putImg(`${URL_SERVER}/productos/${id}`, producto, '');

    switch (peticion) {
        case 200:
            await getProductosTable();
            break;

        case 404:
            alert("Categoria no valida");
            break;

        default:
            alert("Error de conexion");
            console.log("Ocurrio un error al guardar la imagen");
            break;
    }


}
