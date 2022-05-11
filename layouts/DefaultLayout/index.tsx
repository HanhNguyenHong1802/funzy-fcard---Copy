import { ACCESS_TOKEN } from "@/constants/authentication";
import { PUBLIC_ROUTER } from "@/constants/publicRouter";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeAllModal } from "@/redux/modalSlice";
import { selectUserInfo, userInfoThunk } from "@/redux/userSlice";
import authenticationAPI from "@/services/authentication";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRequired from "../LoginRequired";

type DefaultLayoutProps = {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const router = useRouter();

  const pathRouter = router.pathname;
  const isPublicRouter = PUBLIC_ROUTER.includes(pathRouter);

  const cookies = parseCookies();
  const accessToken = cookies[ACCESS_TOKEN];

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(userInfoThunk());
    }
    let checkLogin: any;
    if (user) {
      getCheckStatus();
      checkLogin = setInterval(() => getCheckStatus(), 360 * 1000);
      return () => clearInterval(checkLogin);
    } else {
      clearInterval(checkLogin);
    }
    return;
  }, [user]);

  useEffect(() => {
    dispatch(closeAllModal());
  }, [pathRouter]);

  const getCheckStatus = () => {
    authenticationAPI.checkStatus();
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <main>{!!user || isPublicRouter ? children : <LoginRequired />}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
