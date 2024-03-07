import "./rightBar.scss";
import LastActivities from "./lastActivities/LastActivities";
import Suggestion from "./Suggestion";
import Friends from "./Friends";

const RightBar = () => {

  return (
    <div className="rightBar">
      <div className="container">
          <Suggestion/>
          <LastActivities/>
          <Friends/>
      </div>
    </div>
  );
};

export default RightBar;
