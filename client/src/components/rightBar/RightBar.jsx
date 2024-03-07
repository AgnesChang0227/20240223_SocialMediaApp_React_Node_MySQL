import "./rightBar.scss";
import LastActivities from "../lastActivities/LastActivities";
import {Skeleton} from "@mui/material";
import Suggestion from "./Suggestion";

const RightBar = () => {

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <Suggestion/>
        </div>
        <div className="item">
          <LastActivities/>
        </div>
        <div className="item">
          <span>Friends</span>
          <Skeleton variant="rounded" style={{width:"100%",height:"40px",marginTop:"10px"}} />
          <Skeleton variant="rounded" style={{width:"100%",height:"40px",marginTop:"10px"}} />
          <Skeleton variant="rounded" style={{width:"100%",height:"40px",marginTop:"10px"}} />
          <Skeleton variant="rounded" style={{width:"100%",height:"40px",marginTop:"10px"}} />
          <Skeleton variant="rounded" style={{width:"100%",height:"40px",marginTop:"10px"}} />
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="user">*/}
        {/*    <div className="userInfo">*/}
        {/*      <img*/}
        {/*        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"*/}
        {/*        alt=""*/}
        {/*      />*/}
        {/*      <div className="online" />*/}
        {/*      <span>Jane Doe</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
