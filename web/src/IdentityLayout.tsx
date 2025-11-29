import { Outlet, useNavigate } from "react-router-dom";
import driverApi from "./apis/driver.api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import type { RootState } from "./store";
import { useSelector } from "react-redux";
import useToast from "./hooks/toast.hook";

const IdentityLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { closeToast } = useToast();

  const toastState = useSelector((state: RootState) => state.toast);

  const fetchIdentity = async () => {
    try {
      const response = await driverApi.get("/identity");

      const currentPathRole = location.pathname.split("/")[1];
      const role = response.data.role.toLowerCase();
      if (role == "driver" && role !== currentPathRole) {
        navigate("/driver");
      } else if (role == "host" && role !== currentPathRole) {
        navigate("/host");
      } else if (role == "admin" && role !== currentPathRole) {
        navigate("/admin");
      } else if (
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchIdentity();
  }, []);

  useEffect(() => {
    if (toastState?.isOpen) {
      toast(toastState.text, {
        type: toastState.severity,
        onClose: () => {
          closeToast();
        },
      });
    }
  }, [toastState]);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default IdentityLayout;
