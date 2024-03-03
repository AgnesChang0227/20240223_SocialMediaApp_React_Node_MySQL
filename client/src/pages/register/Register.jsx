import {Link} from "react-router-dom";

import "./register.scss";
import {makeRequest} from "../../axios";
import ValidationForm from "../../layout/validationForm";
import * as yup from "yup";
import {useSnackbar} from "notistack";
import {useState} from "react";
import VerifyEmail from "../../components/verifyEmail";

//validationSchema
const rVS = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
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
});

//initialValues
const rIV = {
  email: "",
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [email,setEmail] = useState(null);
  const [created, setCreated] = useState(false);//to next step => verify email

  //  create user & send code
  const rSH = async (values) => {
    //{email,password,confirmPassword}
    // await makeRequest.post("/auth/register", values)
    //   .then(res => {
    //     // console.log(res);
    //     //res.data => "user has been created"
    //     enqueueSnackbar("Your account has been created successfully! You can login now!", {variant: 'success'})
    //     setEmail(email);
    //     setCreated(true);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     switch (err.code) {
    //       case "ERR_NETWORK":
    //       case "ERR_BAD_RESPONSE":
    //         enqueueSnackbar("Something wrong on server side...", {variant: 'error'});
    //         break;
    //       default:
    //         enqueueSnackbar(err.response.data, {variant: 'error'})
    //     }
    //   })
    console.log(values);
    setEmail(values.email)
    setCreated(true);
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
          {!created
            ? <>
                <h1>Register</h1>
                <ValidationForm validationSchema={rVS} initialValues={rIV} submitHandler={rSH}/>
              </>
            : <>
              <h1>Verify your email</h1>
              <h4 style={{color:"grey"}} >It is highly recommended to verify your email now, as unverified accounts may be subject to system cleanup.</h4>
              <VerifyEmail email={email}/>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Register;
