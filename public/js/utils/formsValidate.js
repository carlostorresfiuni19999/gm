const validateForm = (selector, cb) => {
    const form = document.querySelector(selector)


    form.addEventListener('submit', event => {
        validateFormCallBack(form, event, cb)
    })
};

const validateFormCallBack = (form, event, cb) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        cb();
    }
}