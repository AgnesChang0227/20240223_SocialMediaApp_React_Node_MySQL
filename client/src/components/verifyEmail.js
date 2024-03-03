import React from 'react';
import ValidationForm from "../layout/validationForm";
import * as yup from "yup";

const VerifyEmail = ({email}) => {
  //validationSchema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    code:yup.string().required("Required")
  });

//initialValues
  const initialValues = {
    email: email,
    code:""
  }
  //give email
  const resendHandler =(email)=>{
    console.log(email)
  }

  //give {email,code}
  const submitHandler =(values)=>{
    console.log(values)
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