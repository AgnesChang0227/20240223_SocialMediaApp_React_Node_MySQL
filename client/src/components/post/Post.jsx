import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import {Link} from "react-router-dom";
import Comments from "../comments/Comments";
import {useContext, useState} from "react";
import moment from "moment";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {AuthContext} from "../../context/authContext";
import person from "../../assets/person.png";

const Post = ({post}) => {
  const {currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [commentOpen, setCommentOpen] = useState(false);

  //fetch data: likes,comments
  //likes
  const {isPending, error, data} =
    useQuery({
      queryKey: ['likes', post.id],
      queryFn: () =>
        makeRequest.get("/likes?postId=" + post.id)
          .then(res => res.data)
    })
  //comments
  const {isPending:commentPending, error:commentErr, data:commentData} =
    useQuery({
      queryKey: ['comments', post.id],
      queryFn: () =>
        makeRequest.get("/comments?postId=" + post.id)
          .then(res => res.data)
    })

  //like
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", {postId: post.id});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["likes"]})
    },
  })
  const handleLike = (e) => {
    e.preventDefault();
    mutation.mutate(data.includes(currentUser.id))
  }

  //  delete
  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["posts"]})
    },
  })
  const handleDelete = (e) => {
    e.preventDefault();
    deleteMutation.mutate(post.id);
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={!!!post.profilePic.length ? person :post.profilePic}
                 alt=""/>
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{textDecoration: "none", color: "inherit"}}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.userId === currentUser.id
            ? <button style={{top:"0px"}} onClick={handleDelete}>Delete</button>
            : <></>
          }
          {/*<MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>*/}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={ post.img} alt=""/>
        </div>
        <div className="info">
          <div className="item">
            {isPending ?
              "Loading"
              : data.includes(currentUser.id) ?
                <FavoriteOutlinedIcon style={{color: "red"}} onClick={handleLike}/>
                : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
            {data && data.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon/>
            {!!commentData&&commentData.length} Comments
          </div>
          {/*<div className="item">*/}
          {/*  <ShareOutlinedIcon/>*/}
          {/*  Share*/}
          {/*</div>*/}
        </div>
        {commentOpen && <Comments postId={post.id} comments={commentData}/>}
      </div>
    </div>
  );
};

export default Post;
