import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./layout/layout";
import Friends from "./pages/friends/Friends";
import Messenger from "./pages/messenger/messenger";
import NotFound from "./pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <Layout/>,
    children:
      [
        {path: "/", element: <Home/>},
        {path: "/profile/:userId", element: <Profile/>},
        {path: "/friends", element: <Friends/>},
        {path: "/messenger", element: <Messenger />},
      ],
  },
  {path: "/login", element: <Login/>},
  {path: "/register", element: <Register/>},
  {path: "*", element: <NotFound/>},
]
