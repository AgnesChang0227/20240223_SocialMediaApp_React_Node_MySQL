
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {useParams} from "react-router-dom";
import {useContext,useState} from "react";

import {QueryContext} from "../../context/queryContext";
import {AuthContext} from "../../context/authContext";
import Posts from "../../components/posts/Posts"
import Update from "../../components/update/Update";

import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import GroupIcon from '@mui/icons-material/Group';
import person from "../../assets/person.png";
import cover from "../../assets/defaultCover.jpg";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const {getUserProfile,getFollowers} = useContext(QueryContext);
  const queryClient = useQueryClient();
  const userId = parseInt(useParams().userId);

  //fetch target user info
  const {isPending, error, data} =
    useQuery(getUserProfile(userId,currentUser, setCurrentUser))

  //fetch target user's follower
  const {isPending: rIsPending, data: relationshipData} =
    useQuery(getFollowers(userId))


  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", {userId});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["relationship"]})
    },
  })


  const handleFollow = (e) => {
    e.preventDefault();
    //current user is follower or not
    mutation.mutate(relationshipData.includes(currentUser.id));

  }

  return (
    <div className="profile">
      {isPending ?
        "Loading" :
        <>
          <div className="images">
            <img
              src={!!!data.coverPic ? cover : data.coverPic}
              alt=""
              className="cover"
            />
            <img
              src={!!!data.profilePic.length ? person : data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              {/*<div className="left">*/}
              {/*</div>*/}
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon/>
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon/>
                    <span>{data.website}</span>
                  </div>
                  <div className="item">
                    <GroupIcon/>
                    <span>follows: {rIsPending ? "Loading" : relationshipData.length}</span>
                      </div>
                      </div>
                      <div>{data.desc}</div>
                    {currentUser.id === userId ?
                      <button onClick={() => setOpenUpdate(true)}>
                      Update
                      </button>
                      :
                      <button onClick={handleFollow}>
                    {rIsPending ?
                      "Loading" :
                      relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                      </button>
                    }
                      </div>
                    {/*<div className="right">*/}
                    {/*  /!*<EmailOutlinedIcon/>*!/*/}
                    {/*  /!*<MoreVertIcon/>*!/*/}
                    {/*</div>*/}
                      </div>
                      <Posts userId={userId}/>
                      </div>
                      </>
                    }
                      {openUpdate &&
                        <Update setOpenUpdate={setOpenUpdate} user={data}/>
                      }

                  </div>
                  )
                  };

                  export default Profile;
