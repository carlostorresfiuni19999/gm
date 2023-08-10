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
