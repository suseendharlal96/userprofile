import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";

import useStyle from "./Profile-styles";
import * as action from "../../store/actions/index";

const Profile = ({ profile, setEditId }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer?.authData?.result);
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();

  const isDetailPage = location.pathname.split("/")[1] === "profileDetail";

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          profile.Image ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
      />
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {profile.name}
      </Typography>
      <CardActions className={classes.cardActions}>
        {authData && !isDetailPage && (
          <Button
            size="small"
            color="primary"
            onClick={() => setEditId(profile._id)}
            title="Edit"
          >
            <CreateIcon fontSize="small" />
          </Button>
        )}
        {!isDetailPage && (
          <Button
            size="small"
            color="primary"
            title="View details"
            onClick={() => history.push(`/profileDetail/${profile._id}`)}
          >
            <ViewCompactIcon fontSize="small" />
          </Button>
        )}
        {authData && !isDetailPage && (
          <Button
            size="small"
            color="secondary"
            title="Delete"
            onClick={() => dispatch(action.deleteProfile(profile._id))}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Profile;
