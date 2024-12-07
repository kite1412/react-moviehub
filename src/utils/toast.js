import { toast, Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function toastError(message) {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
}

export function toastSuccess(message) {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
}

export function Toast() {
  return <ToastContainer 
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    style={{ zIndex: Number.MAX_SAFE_INTEGER + 1 }}
  />
}