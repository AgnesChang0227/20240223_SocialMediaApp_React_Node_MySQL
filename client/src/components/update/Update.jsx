import React, {useContext, useState} from 'react';
import "./update.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AuthContext} from "../../context/authContext";

const Update = ({setOpenUpdate,user}) => {
  const {setCurrentUser} = useContext(AuthContext)
  const [cover,setCover] = useState(null)
  const [profile,setProfile] = useState(null)
  const [texts,setTexts] =useState({
    name:user.name,
    city:user.city,
    website:user.website
  });


  const handleChange=(e)=>{
    setTexts(prev=>({...prev,[e.target.name]:[e.target.value]}))
  }

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["user"]});
   },
  })

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit=async (e) => {
    e.preventDefault();

    const coverUrl = cover ? await upload(cover):user.coverPic;
    const profileUrl = profile ? await upload(profile):user.profilePic;

    mutation.mutate({...texts,coverPic:coverUrl,profilePic:profileUrl});
    setOpenUpdate(false)
  //  update current user

  }

  return (
    <div className="update" >
      Update
      <form >
        <input type="file" name="coverPic" onChange={e=>setCover(e.target.files[0])}/>
        <input type="file" name="profilePic" onChange={e=>setProfile(e.target.files[0])}/>
        <input type="text" name="name" placeholder={user.name} onChange={handleChange}/>
        <input type="text" name="city" placeholder={user.city} onChange={handleChange}/>
        <input type="text" name="website" placeholder={user.website} onChange={handleChange}/>
        <button onClick={handleSubmit}>Update</button>
      </form>
      <span onClick={()=>setOpenUpdate(false)}>X</span>
    </div>
  );
};

export default Update;