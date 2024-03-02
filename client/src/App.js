import {useRoutes,} from "react-router-dom";
import {SnackbarProvider} from 'notistack';// alert bar

import {routes} from "./routes";

import "./style.scss"


function App() {
  const router = useRoutes(routes);

  return (
    <div>
      <SnackbarProvider
        className="snackbar"
        anchorOrigin={{ horizontal:"right", vertical: "bottom" }}
      >
        {router}
      </SnackbarProvider>
    </div>
  );
}

export default App;
