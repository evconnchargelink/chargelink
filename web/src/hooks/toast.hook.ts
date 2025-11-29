import { useDispatch } from "react-redux";
import {
  closeToast as closeToastAction,
  openToast as openToastAction,
} from "../store/slices/toast.slice";
import { SEVERITY } from "../store/slices/toast.slice";

const useToast = () => {
  const dispatch = useDispatch();

  const openToast = (text: string, severity: keyof typeof SEVERITY) => {
    console.log(text, severity);
    dispatch(openToastAction({ text, severity }));
  };

  const closeToast = () => {
    dispatch(closeToastAction());
  };

  return {
    openToast,
    closeToast,
  };
};

export default useToast;
