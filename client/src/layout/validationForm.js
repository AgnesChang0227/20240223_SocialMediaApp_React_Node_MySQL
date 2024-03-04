import React, {useState} from 'react';
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";

const initialKeys = (initialValues) => {
  const objectKeys = [];
  for (const key in initialValues) {
    objectKeys.push(key);
  }
  return objectKeys
}
const ValidationForm = ({validationSchema, initialValues, submitHandler, resendHandler}) => {
  const [keys, setKeys] = useState(initialKeys(initialValues) || []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitHandler(values)
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {keys.length ? keys.map((key) => (
              <TextField key={key+1}
                hidden="hidden"
                disabled={(key === "email")&&!!resendHandler&&initialValues[`${key}`].length>0}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id={key}
                name={key}
                value={formik.values[`${key}`]}
                autoComplete="new-password"
                type={(key === "password" || key === "confirmPassword") ? "password" : "text"}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                error={formik.touched[`${key}`] && Boolean(formik.errors[`${key}`])}
                helperText={formik.touched[`${key}`] && formik.errors[`${key}`]}
              />
          ))
          : <></>
        }
        <div className="d-flex justify-items-center">
          {resendHandler && (
            <Button
              onClick={()=>resendHandler(formik.values.email) }
            >
              Send Email
            </Button>
          )}
            <Button type="submit" style={{backgroundColor: "rebeccapurple"}}>
              Submit
            </Button>

        </div>

      </form>
    </div>
  );
};

export default ValidationForm;