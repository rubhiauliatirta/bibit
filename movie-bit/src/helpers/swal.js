import Swal from "sweetalert2"

export function showError(message) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    background: '#dc3545',
    timer: 4000,
    timerProgressBar: true,
    padding: "0.1rem",
    html: `<div class="text-white">${message}</div>`,
    showConfirmButton: false
  })
}

export function showImage(imageUrl, title) {
  Swal.fire({
    imageUrl,
    imageAlt: title,
    width: "300px",
    padding: "0.01rem",
    background: "transparent",
    showConfirmButton: false
  })
}