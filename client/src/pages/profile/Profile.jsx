import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext";
import Update from "../../components/update/Update";
import person from "../../assets/person.png";
import cover from "../../assets/defaultCover.jpg";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const {currentUser, setCurrentUser} = useContext(AuthContext);

  let {userId} = useParams();
  userId = parseInt(userId);

  //fetch target user info
  const {isPending, error, data} =
    useQuery({
      queryKey: ['user'],
      queryFn: () =>
        makeRequest.get("/users/find/" + userId)
          .then(res => {
            console.log({
              ...currentUser,
              name: res.data.name,
              profilePic: res.data.profilePic
            })
            //check if user's name and profilePic is not latest
            if ((currentUser.id === userId) &&
              (currentUser.name !== res.data.name ||
                currentUser.profilePic !== res.data.profilePic))
            {
              setCurrentUser({
                ...currentUser,
                name: res.data.name,
                profilePic: res.data.profilePic
              })
            }
            return res.data
          })
    })
  //fetch target user's follower
  const {isPending: rIsPending, data: relationshipData} =
    useQuery({
      queryKey: ['relationship'],
      queryFn: () =>
        makeRequest.get("/relationships?followedUserId=" + userId)
          .then(res => res.data)
    })

  const queryClient = useQueryClient();
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
              <div className="left">
                {/*<a href="http://facebook.com">*/}
                {/*  <FacebookTwoToneIcon fontSize="large"/>*/}
                {/*</a>*/}
                {/*<a href="http://facebook.com">*/}
                {/*  <InstagramIcon fontSize="large"/>*/}
                {/*</a>*/}
                {/*<a href="http://facebook.com">*/}
                {/*  <TwitterIcon fontSize="large"/>*/}
                {/*</a>*/}
                {/*<a href="http://facebook.com">*/}
                {/*  <LinkedInIcon fontSize="large"/>*/}
                {/*</a>*/}
                {/*<a href="http://facebook.com">*/}
                {/*  <PinterestIcon fontSize="large"/>*/}
                {/*</a>*/}
              </div>
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
                </div>
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
              <div className="right">
                {/*<EmailOutlinedIcon/>*/}
                {/*<MoreVertIcon/>*/}
              </div>
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
