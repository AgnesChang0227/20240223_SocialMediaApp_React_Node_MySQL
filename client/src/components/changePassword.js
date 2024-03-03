import React from 'react';
import ValidationForm from "../layout/validationForm";
import * as yup from "yup";
import {makeRequest} from "../axios";
import {useSnackbar} from "notistack";

//validationSchema
const validationSchema = yup.object().shape({
  password: yup.string()
    .required("Required")
    .min(8, 'Password should be of minimum 8 characters length')
  ,
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

//initialValues
const initialValues = {
  password: '',
  confirmPassword: '',
}

const ChangePassword = ({setStatus}) => {
  const {enqueueSnackbar} = useSnackbar();


  const submitHandler = async (values) => {
    const {password} = values;
    await makeRequest.post("/auth/changePassword", {password})
      .then(res=>{
        enqueueSnackbar("You can use your new password to login now!", {variant: 'success'});
        setStatus("login");
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

  return (
    <div>
      <ValidationForm
        validationSchema={validationSchema}
        initialValues={initialValues}
        submitHandler={submitHandler}/>
    </div>
  );
};

export default ChangePassword;