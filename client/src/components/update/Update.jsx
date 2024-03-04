import React, {useContext, useState} from 'react';
import "./update.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as yup from "yup";
import ValidationForm from "../../layout/validationForm";
import ClearIcon from '@mui/icons-material/Clear';
import cover from "../../assets/defaultCover.jpg";
import person from "../../assets/person.png";
import {Box, Button} from "@mui/material";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string(),
  city: yup.string(),
  website: yup.string(),
});

//name,desc,profilePic,coverPic,city,website
const Update = ({setOpenUpdate, user}) => {
  // const [cover,setCover] = useState(null)
  // const [profile,setProfile] = useState(null)
  const queryClient = useQueryClient();

  const initialValues = {
    name: user.name,
    description: user.desc,
    city: user.city || "",
    website: user.website || "",
  }
  const submitHandler = (values) => {
    console.log(values)
  }

  // const formik = useFormik({
  //   initialValues: uploadInitialValues,
  //   validationSchema: uploadValidationSchema
  // });


  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  })

  // const upload = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const handleSubmit=async (e) => {
  //   e.preventDefault();
  //
  //   const coverUrl = cover ? await upload(cover):user.coverPic;
  //   const profileUrl = profile ? await upload(profile):user.profilePic;
  //
  //   mutation.mutate({...texts,coverPic:coverUrl,profilePic:profileUrl});
  //   setOpenUpdate(false)
  // //  update current user
  // }

  return (
    <div className="update">
      <div className="card">
        <div className="left">
          <ClearIcon style={{position:"absolute",top:"10px",right:"10px"}}
                     onClick={() => setOpenUpdate(false)}/>
          <div className="images">
            <div>
              <img
                src={!!!user.coverPic ? cover : "/upload/" + user.coverPic}
                alt=""
                className="cover"
              />
            </div>
            <div>
              <img
                src={!!!user.profilePic.length ? person
                  : "(/upload/" + user.profilePic}
                alt=""
                className="profilePic"
              />
            </div>
          </div>
          <Box style={{position:"relative",bottom:"-120px"}}
            sx={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between' }}>
            <div style={{width:"50%",padding:"10px"}}>
              <h4>coverPic.png</h4>
              <Button style={{width:"100%"}}>Cover Picture</Button>
            </div>
            <div style={{width:"50%",padding:"10px"}}>
              <h4>profilePic.png</h4>
              <Button style={{width:"100%"}}>Profile Picture</Button>
            </div>

          </Box>

        </div>
        <div className="right">
          <h1>Update Profile</h1>
          <ValidationForm validationSchema={validationSchema}
                          initialValues={initialValues}
                          submitHandler={submitHandler}/>
        </div>
        {/*<form >*/}
        {/*  <input type="file" name="coverPic" onChange={e=>setCover(e.target.files[0])}/>*/}
        {/*  <input type="file" name="profilePic" onChange={e=>setProfile(e.target.files[0])}/>*/}
        {/*  <input type="text" name="name" placeholder={user.name} onChange={handleChange}/>*/}
        {/*  <input type="text" name="city" placeholder={user.city} onChange={handleChange}/>*/}
        {/*  <input type="text" name="website" placeholder={user.website} onChange={handleChange}/>*/}
        {/*  <button onClick={handleSubmit}>Update</button>*/}
        {/*</form>*/}

      </div>
    </div>
  );
};

export default Update;