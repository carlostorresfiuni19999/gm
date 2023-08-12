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
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
      
        const product = document.getElementById('product').value;
        const desc = document.getElementById('desc').value;
        const price = parseFloat(document.getElementById('price').value);
        const catSelect = document.getElementById('cat-select');
        const selectedCat = catSelect.options[catSelect.selectedIndex].value;
        const imagenInput = document.getElementById('imagen');
      
        
      
        
      
        const formData = new FormData();
        formData.append('nombre', product);
        formData.append('descripcion', desc);
        formData.append('precio', price);
        formData.append('categoria', selectedCat);
        formData.append('imagen', imagenInput.files[0]);
      
        fetch('/ruta-de-productos', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            console.log('Producto creado:', data);
            // Aquí podrías realizar acciones adicionales si es necesario
          })
          .catch(error => {
            console.error('Error al crear el producto:', error);
          });
      });
      
}