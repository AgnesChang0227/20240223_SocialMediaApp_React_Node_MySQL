import {Link} from "react-router-dom";
import {useState} from "react";


import "./register.scss";
import {makeRequest} from "../../axios";
import {Field, Form, Formik} from "formik";
import {Snackbar, TextField} from "@mui/material";
import ValidationForm from "../../layout/validationForm";
import * as yup from "yup";
import {useSnackbar} from "notistack";

const rVS =yup.object().shape({
  password: yup.string()
    .required("Required")
    .min(8, 'Password should be of minimum 8 characters length')
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*_\-+='"|\\(){}\[\]:;「`<>,.?/]).{8,}$/,
  //   "Minimum 8 Characters, with Uppercase, Lowercase, Number and Special Case Character"
  // ),
  ,
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
});

const rIV= {
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const { enqueueSnackbar} = useSnackbar();

  const rSH = async (values) => {
    console.log(values);
    try {
      await makeRequest.post("/auth/register", values)
        .then(res=>{
          console.log(res);
          enqueueSnackbar(res.data, { variant: 'success' })
        })
    } catch (err) {
      console.log(err)
      switch (err.code){
        case "ERR_NETWORK":
          enqueueSnackbar("Something wrong on server side...", { variant: 'error' });
          break;
        default:
          enqueueSnackbar(err.response.data, { variant: 'error' })
      }
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <ValidationForm validationSchema={rVS} initialValues={rIV} submitHandler={rSH}/>
        </div>
      </div>
    </div>
  );
};

export default Register;
