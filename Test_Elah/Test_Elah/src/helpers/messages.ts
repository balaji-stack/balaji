import Swal, { SweetAlertIcon } from "sweetalert2";

export function popupMsg(msg: string,iconImg: SweetAlertIcon){
  Swal.fire({
    text: msg,
    icon: iconImg,
    confirmButtonColor: "#0069ba",
    confirmButtonText: "OK",
    customClass: {
      confirmButton: "site_btn primary_btn"
    }
  });
}
