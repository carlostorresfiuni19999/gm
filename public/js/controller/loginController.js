const initLogin = () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    document.querySelector("#formLogin")
        .addEventListener("submit", event => {
            event.preventDefault();
            if (user.email === username.value && user.password === password.value) {
                user.logged = true;
                localStorage.setItem("user", JSON.stringify(user));
                location.href = "./categoria.html";
            } else {
                alert("Credenciales no validas, intente de nuevo");
            }
        })

}