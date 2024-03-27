import Post from "../post/Post";
import {useQuery,} from '@tanstack/react-query'

import "./posts.scss";
import {useContext} from "react";
import {QueryContext} from "../../context/queryContext";

const Posts = ({userId}) => {
  const {getPosts} = useContext(QueryContext)
  const {isPending, error, data} = useQuery(getPosts(userId));

  return <div className="posts">
    {error ?
      error.response.data :
      isPending ?
        "loading" :
        data.map((post,index) => <Post post={post} key={`${index}_${post.id}`}/>)
    }
  </div>;
};

export default Posts;
