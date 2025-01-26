import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => {
  return (
    <ToastContainer
      limit={5}
      autoClose={1800}
      draggable
      theme="colored" //TODO when theme is implemented, get the theme context to change this
    />
  );
};

export default ToastConfig;
