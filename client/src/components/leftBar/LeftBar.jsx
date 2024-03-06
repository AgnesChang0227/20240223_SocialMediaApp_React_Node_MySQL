import "./leftBar.scss";
import Friends from "../../assets/1.png";
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";
import person from "../../assets/person.png";
import {Skeleton} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {makeRequest} from "../../axios";
import {useSnackbar} from "notistack";

const LeftBar = () => {

  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const logoutHandler = () => {
    makeRequest.get("/auth/logout")
      .then(res => {
        localStorage.removeItem("user");
        enqueueSnackbar("Logout! Redirect you to login page...", {variant: 'success'})
        navigate("/login")
      })
      .catch(err => {
        switch (err.code) {
          case "ERR_NETWORK":
          case "ERR_BAD_RESPONSE":
            enqueueSnackbar("Something wrong on server side...", {variant: 'error'});
            break;
          default:
            enqueueSnackbar(err.response.data, {variant: 'error'})
        }
      })
  }

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={!!!currentUser.profilePic.length ? person
                : currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          {/*profile*/}
          <Link to={`/profile/${currentUser.id}}`} style={{textDecoration: "none"}}>
            <div className="item">
              <PersonOutlinedIcon/>
              <span>Profile</span>
            </div>
          </Link>
          {/*friends*/}
          <Link to="/" style={{textDecoration: "none"}}>
            <div className="item">
              <Diversity3Icon/>
              <span>Friends</span>
            </div>
          </Link>
          {/*logout*/}
          <Link onClick={logoutHandler} style={{textDecoration: "none"}}>
            <div className="item">
              <LogoutIcon/>
              <span>Logout</span>
            </div>
          </Link>
          <Skeleton variant="rounded" height={60}/>
          <Skeleton variant="rounded" height={60}/>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shortcuts</span>
          <Skeleton variant="rounded" height={60}/>
          <Skeleton variant="rounded" height={60}/>
          <Skeleton variant="rounded" height={60}/>
          {/*<div className="item">*/}
          {/*  <img src={Events} alt="" />*/}
          {/*  <span>Events</span>*/}
          {/*</div>*/}
        </div>
        <hr/>
        <div className="menu">
          <span>Others</span>
          <Skeleton variant="rounded" height={60}/>
          <Skeleton variant="rounded" height={60}/>
          <Skeleton variant="rounded" height={60}/>
          {/*<div className="item">*/}
          {/*  <img src={Fund} alt="" />*/}
          {/*  <span>Fundraiser</span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
