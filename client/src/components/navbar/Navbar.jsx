import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext";
import {AuthContext} from "../../context/authContext";
import person from "../../assets/person.png";
import {makeRequest} from "../../axios";
import {useSnackbar} from "notistack";

const Navbar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const logoutHandler = ()=>{
    makeRequest.get("/auth/logout")
      .then(res=>{
        localStorage.removeItem("user");
        enqueueSnackbar("Logout! Redirect you to login page...", {variant: 'success'})
        navigate("/login")
      })
      .catch(err=>{
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
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration: "none"}}>
          <span>SocialWeb </span>
        </Link>
        <Link to="/" className="icon" style={{textDecoration: "none"}}>
          <HomeOutlinedIcon/>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{cursor: "pointer"}}/>
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{cursor: "pointer"}}/>
        )}
        {/*<GridViewOutlinedIcon />*/}
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..."/>
        </div>
      </div>
      <div className="right">
        {/*btn for logout*/}
        <div className="user">
          <img
            src={!!!currentUser.profilePic.length ? person
              : "(/upload/" + currentUser.profilePic}
            alt="hi"
          />
          <span>{currentUser.name}</span>
        </div>
        <PersonOutlinedIcon/>
        <LogoutIcon style={{cursor:"pointer"}} onClick={logoutHandler}/>

      </div>
    </div>
  );
};

export default Navbar;
