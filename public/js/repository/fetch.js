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


const postImg = async (url, object, token) => {

    const formData = new FormData();
    formData.append('nombre', object.nombre);
    formData.append('descripcion', object.descripcion);
    formData.append('precio', object.precio);
    formData.append('categoria', object.categoria);
    formData.append('imagen', object.imagen.files[0]);


    const request = {
        method: 'POST',
        body: formData
    };

    const response = await fetch(url, request);
    return response.status;
}