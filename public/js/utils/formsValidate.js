const validateForm = (selector, cb) => {
    const form = document.querySelector(selector)

    // Loop over them and prevent submission

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            cb();
        }       

    })
};