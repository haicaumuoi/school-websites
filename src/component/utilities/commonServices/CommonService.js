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
      autoClose: 3000,
      newestOnTop: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "colored",
      ...config,
    });
  }
  