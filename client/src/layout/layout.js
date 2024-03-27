import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useContext} from "react";

import {DarkModeContext} from "../context/darkModeContext";
import Navbar from "../components/navbar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import RightBar from "../components/rightBar/RightBar";
import {AuthContext} from "../context/authContext";


const Layout = () => {
  const queryClient = new QueryClient();
  const {darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  const location = useLocation();

  const {pathname} =location;
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    return children;
  };
  console.log(pathname)
  return (
    <ProtectedRoute>
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar/>
          <div style={{display: "flex"}}>
            {!pathname==="/messenger"&&(
              <LeftBar/>
            )}
            <div style={{flex: 7}}>
              <Outlet/>
            </div>
            {!pathname==="/messenger"&&(
              <RightBar/>
            )}

          </div>
        </div>
      </QueryClientProvider>
    </ProtectedRoute>
  );
};

export default Layout;