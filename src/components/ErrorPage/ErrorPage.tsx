import { FcExpired, FcHome } from "react-icons/fc"
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="flex pb-5 text-5xl">Oops! page not exist<FcExpired /></h1>
            <p className="pb-2 text-xl">navigate back to the home page:</p>
            <Link to={'/'} className="text-4xl border-b  border-slate-800 px-2 py-1  hover:scale-110"><FcHome /></Link>
        </div>
    )
}

export default ErrorPage