import HomePage from "../../View/Home.tsx";
import {FC} from "react";
import Login from "../../View/Login.tsx";
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";

const routes: RouteObject[]  = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <Login />
    }
]

const router = createBrowserRouter(routes)

const RouterComponent: FC = () => (<RouterProvider router={router} />)

export default RouterComponent
