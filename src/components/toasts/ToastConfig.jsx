import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => {
  return (
    <ToastContainer
      limit={5}
      // position="top-center"
      // newestOnTop={true}
      autoClose={1800}
      // hideProgressBar
      draggable
      theme="colored" //TODO when theme is implemented, get the theme context to change this
    />
  );
};

export default ToastConfig;
