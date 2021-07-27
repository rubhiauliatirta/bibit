import Swal from "sweetalert2"

export function showError(message) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    background: '#dc3545',
    timer: 4000,
    timerProgressBar: true,
    html: `<p class="text-white">${message}</p>`,
    showConfirmButton: false
  })
}