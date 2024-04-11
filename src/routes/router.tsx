import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Register from "./Register/Register";
import About from "./About/About";
import UserCard from "./UserCard";
import Login from "./Login/Login";
import Cards from "./Home/Cards";
import ProtectedRout from "../services/ProtectedRout";
import FavCrads from "./FavCrads";
import MyCards from "./MyCards";
import CreateCard from "./CreateCard";

export const router = createBrowserRouter([
    {
        path: "/react-cards-project",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Cards />
            },
            {
                path: 'cards/:id'
                , element: <UserCard />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/login',
                element: <Login />
            }, {
                path: '/favcards',
                element: <ProtectedRout><FavCrads /></ProtectedRout>
            }, {
                path: '/mycards',
                element: <ProtectedRout><MyCards /></ProtectedRout>
            },
            {
                path: '/create',
                element: <ProtectedRout><CreateCard /></ProtectedRout>
            },
        ],
    },
]);