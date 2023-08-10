const showSpinner = (element) => {
  element.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    </div>`;
}

const offSpinner = (element) => {
  element.innerHTML = "";
}