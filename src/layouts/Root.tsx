import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Root = () => {
    return (
        <div className="flex flex-col min-h-screen tex-black dark:text-textDark">
            <Header />
            <main className=" flex flex-col px-3 py-2">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer role="Alert" />
        </div>
    )
}

export default Root