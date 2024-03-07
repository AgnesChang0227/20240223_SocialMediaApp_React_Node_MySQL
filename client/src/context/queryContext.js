import {createContext} from "react";
import {makeRequest} from "../axios";

export const QueryContext = createContext();

export const QueryContextProvider = ({children}) => {
  const values = {
    getPostLikes,//likes
    getPostComments,//comments
    getUserProfile,//user
    getFollowers,//relationship
    getPosts,//posts
    getLatestActs,//latestActs,
    getSuggestions,//suggestions
  }
  return (
    <QueryContext.Provider value={values}>
      {children}
    </QueryContext.Provider>
  );
};

// likes
const getPostLikes = (postId) => {
  return{
    queryKey: ['likes', postId],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + postId)
        .then(res => res.data)
  }
}
//comments
const getPostComments= (postId)=>{
  return {
    queryKey: ['comments', postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId)
        .then(res => res.data)
  }
}
//user
const getUserProfile=(userId,currentUser,setCurrentUser)=>{
  return{
    queryKey: ['user', userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId)
        .then(res => {
          //check if user's name and profilePic is not latest
          if ((currentUser.id === userId) &&
            (currentUser.name !== res.data.name ||
              currentUser.profilePic !== res.data.profilePic)) {
            setCurrentUser({
              ...currentUser,
              name: res.data.name,
              profilePic: res.data.profilePic
            })
          }
          return res.data
        })
  }
}
//relationship
const getFollowers =(userId)=>{
  return {
    queryKey: ['relationship',userId],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId)
        .then(res => res.data)
  }
}
//posts
const getPosts = (userId)=>{
  return{
    queryKey: ['posts',userId],
    queryFn: () =>
      makeRequest.get("/posts"+(userId?`?userId=${userId}`:""))
        .then(res => res.data)
        .catch(err=>{
          console.log(err);
        })
  }
}

const getLatestActs = (userId,num)=>{
  return{
    queryKey:["latestActs",userId],
    queryFn:()=>
      makeRequest.get(`/relationships/latestActs?id=${userId}&num=${num}`)
        .then(res=>res.data)
        .catch(err=>{
          console.log(err);
        })

  }
}

const getSuggestions = (currentUserId)=>{
  return {
    queryKey:["suggestions",currentUserId],
    queryFn:()=>
      makeRequest.get(`/users/suggestion/${currentUserId}`)
        .then(r=>r.data)
        .catch(err=>{
          console.log(err);
        })
  }

}