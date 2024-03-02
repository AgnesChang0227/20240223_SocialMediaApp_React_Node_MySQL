import React, {useState} from 'react';
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";

const initialKeys =(initialValues)=>{
  const objectKeys = [];
  for (const key in initialValues) {
    objectKeys.push(key);
  }
  return objectKeys
}
const ValidationForm = ({validationSchema,initialValues,submitHandler}) => {
  const [keys,setKeys] = useState(initialKeys(initialValues)||[]);

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
        {keys.length? keys.map((key)=>(
            <TextField
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              key = {key}
              id={key}
              name={key}
              type={(key==="password"||key==="confirmPassword")?"password":"text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              error={formik.touched[`${key}`] && Boolean(formik.errors[`${key}`])}
              helperText={formik.touched[`${key}`] && formik.errors[`${key}`]}
            />
        ))
        :<></>}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ValidationForm;