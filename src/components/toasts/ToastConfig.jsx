import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => {
  return (
    <ToastContainer
      newestOnTop={true}
      autoClose={2500}
      position="top-right"
      theme="dark" //TODO when theme is implemented, get the theme context to change this
    />
  );
};

export default ToastConfig;
