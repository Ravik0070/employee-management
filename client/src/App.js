import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./style.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import SingleEmployee from "./pages/SingleEmployee";
import SingleData from "./pages/SingleData";
function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };
  const { currentUser } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/employee/:id",
          element: <SingleEmployee />,
        },
        {
          path: "/item/:id",
          element: <SingleData />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Registration />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
