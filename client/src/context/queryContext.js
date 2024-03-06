import {createContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../axios";

export const QueryContext = createContext();

export const QueryContextProvider = ({children}) => {
// likes
  const getPostLikes = (postId) => {
    return{
      queryKey: ['likes', postId],
      queryFn: () =>
        makeRequest.get("/likes?postId=" + postId)
          .then(res => res.data)
    }
  }
//  comments
const getPostComments= (postId)=>{
    return {
      queryKey: ['comments', postId],
      queryFn: () =>
        makeRequest.get("/comments?postId=" + postId)
          .then(res => res.data)
    }
}



  const values = {
    getPostLikes,
    getPostComments
  }
  return (
    <QueryContext.Provider value={values}>
      {children}
    </QueryContext.Provider>
  );
};
