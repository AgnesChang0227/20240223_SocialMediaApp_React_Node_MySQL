import React, {useState} from 'react';
import "./update.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as yup from "yup";
import ValidationForm from "../../layout/validationForm";
import ClearIcon from '@mui/icons-material/Clear';
import {Box, Button} from "@mui/material";
import {useSnackbar} from "notistack";
import {Field, Formik, useFormik} from "formik";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string(),
  city: yup.string(),
  website: yup.string(),
});

//name,desc,profilePic,coverPic,city,website
const Update = ({setOpenUpdate, user}) => {
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  const initialValues = {
    name: user.name,
    description: user.desc,
    city: user.city || "",
    website: user.website || "",
  }

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user)
        .then(res => {
          enqueueSnackbar(`Update successfully !`, {variant: 'success'})
        })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["user"]});
    },
  })

  const upload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("image", file);//same as multer setting
      const res = await makeRequest.post(`/upload?type=${type}`, formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const submitHandler = async (values) => {
    //upload images
    const coverUrl = cover ? await upload(cover, "cover") : user.coverPic;
    const profileUrl = profile ? await upload(profile, "profile") : user.profilePic;
    const {description,...others}  = values
    mutation.mutate({...others,desc:description, coverPic: coverUrl, profilePic: profileUrl});
    setOpenUpdate(false)
  }

  const checkSize = e => {
    if (e.target.files[0].size > 4 * 1024 * 1024) {
      e.target.value = null
      enqueueSnackbar(`Only accept images < 4MB`, {variant: 'warning'})
      return
    }
    e.target.name === "coverPic"
      ? setCover(e.target.files[0])
      : setProfile(e.target.files[0])
  }

  return (
    <div className="update">
      <div className="card">
        <div className="left">
          <ClearIcon style={{position: "absolute", top: "10px", right: "10px"}}
                     onClick={() => setOpenUpdate(false)}/>
          <div className="images">
            <div>
              <img
                src={!!cover ? URL.createObjectURL(cover) : user.coverPic}
                alt=""
                className="cover"
              />
            </div>
            <div>
              <img
                src={!!profile ? URL.createObjectURL(profile) : user.profilePic}
                alt=""
                className="profilePic"
              />
            </div>
          </div>
          <Box style={{position: "relative", bottom: "-120px"}}
               sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{width: "50%", padding: "10px"}}>
              <h4>Cover Picture</h4>
              <input type="file" name="coverPic" style={{width: "100%"}}
                     accept="image/jpeg, image/png"
                     onChange={checkSize}
              />
            </div>
            <div style={{width: "50%", padding: "10px"}}>
              <h4>Profile Picture</h4>
              <input type="file" name="profilePic" style={{width: "100%"}}
                     accept="image/jpeg, image/png"
                     onChange={checkSize}/>
            </div>
          </Box>
        </div>
        <div className="right">
          <h1>Update Profile</h1>
          <ValidationForm validationSchema={validationSchema}
                          initialValues={initialValues}
                          submitHandler={submitHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Update;