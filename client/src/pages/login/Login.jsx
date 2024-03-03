import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import * as yup from "yup";

import "./login.scss"
import ValidationForm from "../../layout/validationForm";
import {makeRequest} from "../../axios";
import {useSnackbar} from "notistack";

//validationSchema
const lVS = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});
//initialValues
const lIV = {
  email:"",
  password:""
}

const Login = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(AuthContext);
  const {enqueueSnackbar} = useSnackbar();

  const lSH = async (values) => {
    await makeRequest.post("/auth/login",values)
      .then(res=>{
        enqueueSnackbar(`Welcome back, user ${res.data.name} !`, {variant: 'success'})
        setCurrentUser(res.data)
        navigate("/");
      })
      .catch(err=>{
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
          <h1>Login</h1>
          <ValidationForm validationSchema={lVS} initialValues={lIV} submitHandler={lSH}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
