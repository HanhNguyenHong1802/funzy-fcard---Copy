/* eslint-disable require-jsdoc */
import Footer from "@/layouts/Footer";
import React, { Component, ErrorInfo, ReactNode } from "react";
import HeaderErrorBoundary from "./HeaderErrorBoundary";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <HeaderErrorBoundary />
          <main className="flex min-h-[80vh] mt-[52px]">
            <div className="w-5/6 lg:w-4/6 max-w-lg rounded-md shadow border p-4 m-auto flex flex-col justify-center items-center">
              <p className="font-semibold text-lg text-center">
                Đã xảy ra lỗi trong quá trình tải trang
              </p>
              <p className="font-semibold text-lg text-center">
                <span className="text-blue-500"> {window.location.href} </span>
              </p>
              <a
                href="/"
                className="block h-10 p-2 px-10 rounded bg-[#F89736] text-white font-semibold mt-4"
              >
                Về trang chủ
              </a>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
