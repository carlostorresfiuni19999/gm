const loadProducts = () => {
    getCategoriasSelect();
    setInterval(getCategoriasSelect, 30000);
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

    const nombre = document.getElementById('product').value;
    const descripcion = document.getElementById('desc').value;
    const price = parseFloat(document.getElementById('price').value);
    const catSelect = document.getElementById('cat-select');
    const selectedCat = catSelect.options[catSelect.selectedIndex].value;
    const imagenInput = document.getElementById('imagen');

    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = imagenInput.files[0].name.toLowerCase().slice(-4); // Obtener la extensión

    if (!allowedExtensions.includes(fileExtension)) {
        alert('El archivo debe ser una imagen en formato JPG o PNG.');
        return;
    }

    // Verificar si se seleccionó un archivo y si es una imagen (jpg o png)
    if (imagenInput.files.length === 0) {
        alert('Debes seleccionar una imagen.');
        return;
    } else if(imagenInput.files.length > 1){
        alert("Solo debes seleccionar una imagen");
        return;
    } else {
        const producto = new ProductoCreate(
            nombre, descripcion, price, selectedCat, imagenInput
        )

        const peticion = await postImg('', producto, '');
    }
    
}