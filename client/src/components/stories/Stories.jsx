import {useContext} from "react";
import "./stories.scss"
import {AuthContext} from "../../context/authContext"
import person from "../../assets/person.png";
import {Skeleton} from "@mui/material";

const Stories = () => {

  const {currentUser} = useContext(AuthContext)

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={!!!currentUser.profilePic.length ? person
          : "(/upload/" + currentUser.profilePic}
             alt=""/>
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className="story" key={story.id}>
          {/*<img src={story.img} alt=""/>*/}
          <Skeleton variant="rounded" style={{width:"100%",height:"100%"}} />
          <span>username</span>
        </div>
      ))}
    </div>
  )
}

export default Stories