import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App.jsx";
import Login from "../views/login/Login.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default routes;