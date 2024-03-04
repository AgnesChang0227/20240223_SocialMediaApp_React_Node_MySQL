import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import * as yup from "yup";
import ValidationForm from "../../layout/validationForm";
import {makeRequest} from "../../axios";
import {useSnackbar} from "notistack";

import "./login.scss"
import VerifyEmail from "../../components/verifyEmail";
import ChangePassword from "../../components/changePassword";

//validationSchema
const lVS = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});
//initialValues
const lIV = {
  email: "",
  password: ""
}

const Login = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(AuthContext);
  const {enqueueSnackbar} = useSnackbar();
  const [status, setStatus] = useState("login");

  const lSH = async (values) => {
    await makeRequest.post("/auth/login", values)
      .then(res => {
        console.log(res.data)
        enqueueSnackbar(`Welcome back, user ${res.data.name} !`, {variant: 'success'})
        setCurrentUser(res.data)
        navigate("/");
      })
      .catch(err => {
        switch (err.code) {
          case "ERR_NETWORK":
          case "ERR_BAD_RESPONSE":
            enqueueSnackbar("Something wrong on server side...", {variant: 'error'});
            break;
          default:
            enqueueSnackbar(err.response.data, {variant: 'error'})
        }
      })
    ;
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          {status === "login" && (
            <>
              <h1>Login</h1>
              <ValidationForm validationSchema={lVS} initialValues={lIV} submitHandler={lSH}/>
              <Link onClick={()=>setStatus("forgetPassword")}>Forget your password?</Link>
            </>
          )}
          {status==="forgetPassword"&&(
            <>
              <h1>Verify your email first</h1>
              <VerifyEmail setStatus={setStatus}/>
              <Link onClick={()=>setStatus("login")}>Login</Link>
            </>
          )}
          {status==="changePassword"&&(
            <>
              <h1>Reset your password</h1>
              <ChangePassword setStatus={setStatus}/>
              <Link onClick={()=>setStatus("login")}>Login</Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
