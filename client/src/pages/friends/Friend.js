import React, {useContext} from 'react';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import GroupIcon from "@mui/icons-material/Group";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {AuthContext} from "../../context/authContext";
import {QueryContext} from "../../context/queryContext";

const Friend = ({user}) => {
  const {currentUser} = useContext(AuthContext);
  const {getFollowers} = useContext(QueryContext);
  const queryClient = useQueryClient();

  //fetch target user's follower
  const {isPending: rIsPending, data: relationshipData} =
    useQuery(getFollowers(user.userId))


  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + user.userId);
      return makeRequest.post("/relationships", {userId:user.userId});
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
    !!user&&
    <div>
      <Card className="card"
            variant="outlined"
            orientation="horizontal"
      >
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img src={user.profilePic} alt=""/>
        </AspectRatio>
        <CardContent>
          <Typography  level="title-lg" id="card-description">
            <Link to={`/profile/${user.userId}`} className="title" style={{textDecoration:"none"}}>
              {user.name}
            </Link>
          </Typography>
          <Typography className="title" level="body-sm" aria-describedby="card-description" mb={1}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <PlaceIcon fontSize="small"/>
                  <span style={{ verticalAlign: 'middle' }}>{user.city}</span>
                </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageIcon fontSize="small"/>
                  <span style={{ verticalAlign: 'middle' }}>{user.website}</span>
                </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon fontSize="small"/>
                  <span style={{ verticalAlign: 'middle' }}>{!!relationshipData&&relationshipData.length}</span>
                </span>
            </div>
          </Typography>
          <Button className="button" onClick={handleFollow}>                    {rIsPending ?
            "Loading" :
            relationshipData.includes(currentUser.id)
              ? "Following"
              : "Follow"}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Friend;