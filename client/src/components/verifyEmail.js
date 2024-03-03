import React from 'react';
import ValidationForm from "../layout/validationForm";
import * as yup from "yup";
import {makeRequest} from "../axios";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

//validationSchema
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  code:yup.string().required("Required")
});


const VerifyEmail = ({email}) => {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  //initialValues
  const initialValues = {
    email: email,
    code:""
  }

  //give email
  const resendHandler =async (email) => {
    await makeRequest.get("/auth/resend/" + email)
      .then(res=>{
        enqueueSnackbar("Email has been resent!", {variant: 'success'})
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
  }

  //give {email,code}
  const submitHandler =async (values) => {
    await makeRequest.post("/auth/verify", values)
      .then(res => {
        enqueueSnackbar("Verify successfully! Turn to login page...", {variant: 'success'});
        navigate("/login");
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
  }


  return (
    <div>
      <ValidationForm
        validationSchema={validationSchema}
        initialValues={initialValues}
        submitHandler={submitHandler}
        resendHandler={resendHandler}/>
    </div>
  );
};

export default VerifyEmail;