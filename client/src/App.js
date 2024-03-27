import {useRoutes,} from "react-router-dom";
import {SnackbarProvider} from 'notistack';// alert bar

import {routes} from "./routes";

import "./style.scss"
import {QueryContextProvider} from "./context/queryContext";
import {SocketContextProvider} from "./context/socketContext";


function App() {
  const router = useRoutes(routes);

  return (
    <SocketContextProvider>
      <QueryContextProvider>
        <SnackbarProvider
          preventDuplicate={true}
          anchorOrigin={{ horizontal:"right", vertical: "bottom" }}
        >
          {router}
        </SnackbarProvider>
      </QueryContextProvider>
    </SocketContextProvider>
  );
}

export default App;
