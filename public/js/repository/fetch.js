const getsHttp = async (url, token) => {
    try {
        const response = await fetch(url);

        if (response.status == 200) {
            const data = await response.json();
            return {
                data: data,
                status: response.status
            };
        }
    }
    catch (e) {
        console.log(e);
        return {
            status: response.status,
            error: e
        };
    }
}

const postHttp = async (url, raw, token) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify(raw);
        const request = {
            method: "POST",
            headers: headers,
            body: body,
            redirect: "follow"
        }

        const response = await fetch(url, request);
        return response.status;
    } catch (e) {
        console.log(e);
    }



}

const putHttp = async (url, raw, token) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify(raw.data);
        const request = {
            method: "PUT",
            headers: headers,
            body: body,
            redirect: "follow"
        }

        const response = await fetch(`${url}/${raw.id}`, request);
        return response.status;

    } catch (e) {
        console.log(e);
        return 500;
    }

}

const deleteHttp = async (url, token, id) => {
    try {
        const request = {
            method: "DELETE",
            redirect: "follow"
        };

        const response = await fetch(`${url}/${id}`, request);

        if (response.ok)
            return true;

    } catch (e) {
        console.log(e);
        return false;
    }

}

const getHttp = async (url, token, id) => {
    let status;
    try {
        const response = await fetch(`${url}/${id}`);
        status = response.status;
        if (status == 200) {
            const data = await response.json();
            return {
                data: data,
                status: status
            };
        }
    } catch (e) {
        console.log(e);
        return {
            error: e,
            status: status
        };
    }
}


const postImg = async (selector, url, object, token) => {
    // Supongamos que estos son los datos del producto
    const producto = {
        nombre: 'Nombre del producto',
        descripcion: 'Descripción del producto',
        precio: 1000,
        categoria: 'ID de la categoría',
    };

    const imagenInput = document.querySelector(selector);
    const reader = new FileReader();

    reader.onload = function (event) {
        producto.imagenBase64 = event.target.result; // Convertir la imagen a base64 y agregarla al objeto

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Producto creado:', data);
            })
            .catch(error => {
                console.error('Error al crear el producto:', error);
            });
    };

    reader.readAsDataURL(imagenInput.files[0]); // Leer la imagen como base64

}