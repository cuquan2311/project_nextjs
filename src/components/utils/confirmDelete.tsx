import Swal from "sweetalert2";

export const confirmDelete = async (title: string, text: string, confirm: string, cancel: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
  });
  return result.isConfirmed;
};
