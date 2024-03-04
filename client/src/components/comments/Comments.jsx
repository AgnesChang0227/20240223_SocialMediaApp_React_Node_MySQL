import {useContext, useState} from "react";
import "./comments.scss";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import moment from "moment";
import person from "../../assets/person.png"

const Comments = ({postId, comments: data}) => {
  const {currentUser} = useContext(AuthContext);
  const [desc, setDesc] = useState("");
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
        <img src={!!!currentUser.profilePic.length ? person : currentUser.profilePic} alt=""/>
        <input type="text" placeholder="write a comment" value={desc}
               onChange={e => setDesc(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
      {data.map((comment, index) => (
        <div className="comment" key={index}>
          <img src={!!!comment.profilePic.length ? person : comment.profilePic} alt=""/>
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
