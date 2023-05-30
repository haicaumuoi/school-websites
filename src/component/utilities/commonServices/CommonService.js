import { toast } from "react-toastify";

export function addNotification(type, title, message, config) {
    let showMessage;
    if (type == 'success') showMessage = toast.success;
    else if (type == 'info') showMessage = toast.info;
    else if (type == 'warning') showMessage = toast.warning;
    else if (type == 'error') showMessage = toast.error;
    else showMessage = toast;
    showMessage(message, {
      position: "bottom-right",
      autoClose: 5000,
      newestOnTop: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      ...config,
    });
  }
  