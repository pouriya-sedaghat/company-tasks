import Header from "../components/Header";
import Footer from "../components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer position="bottom-left" limit={1} />
      <div className="d-flex flex-column justify-content-between min-vh-100 bg-light text-dark">
        <Header />
        <main className="container m-auto mt-0 py-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
