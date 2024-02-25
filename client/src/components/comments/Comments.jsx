import {useContext, useState} from "react";
import "./comments.scss";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import moment from "moment";

const Comments = ({postId}) => {
  const {currentUser} = useContext(AuthContext);
  const [desc,setDesc] = useState("");

  //fetch comments
  const {isPending, error, data} =
    useQuery({
      queryKey: ['comments'],
      queryFn: () =>
        makeRequest.get("/comments?postId="+postId)
          .then(res => res.data)
    })

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["comments"]})
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId})
    setDesc("");
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt=""/>
        <input type="text" placeholder="write a comment" value={desc}
               onChange={e=>setDesc(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
      {isPending ?
        "Loading" :
        data.map((comment) => (
          <div className="comment">
            <img src={comment.profilePic} alt=""/>
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
