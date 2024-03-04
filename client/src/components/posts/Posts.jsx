import Post from "../post/Post";
import {useQuery,} from '@tanstack/react-query'

import "./posts.scss";
import {makeRequest} from "../../axios";

const Posts = ({userId}) => {
  const {isPending, error, data} =
    useQuery({
      queryKey: ['posts'],
      queryFn: () =>
        makeRequest.get("/posts"+(userId?`?userId=${userId}`:""))
          .then(res => res.data)
          .catch(err=>{
            console.log(err);
          })
    })

  return <div className="posts">
    {error ?
      error.response.data :
      isPending ?
        "loading" :
        data.map(post => <Post post={post} key={post.id}/>)
    }
  </div>;
};

export default Posts;
