import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import useStyle from "./styles";
import * as action from "../../store/actions/index";
const PostForm = ({ editId, setEditId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profileReducer.creating);
  const profiles = useSelector((state) => state.profileReducer.profiles);
  const errors = useSelector((state) => state.profileReducer.errors);
  const editPost = editId
    ? profiles &&
      profiles.length &&
      profiles.find((profile) => profile._id === editId)
    : null;
  const [profileData, setProfileData] = useState({
    name: "",
    Image: "",
  });
  useEffect(() => {
    if (editPost) {
      setProfileData(editPost);
    }
  }, [editId]);

  useEffect(() => {
    clear();
  }, [profiles]);

  const clear = () => {
    setProfileData({ name: "", Image: "" });
    setEditId(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPost) {
      dispatch(action.updateProfile(editId, profileData));
    } else {
      dispatch(action.createProfile(profileData));
    }
    clear();
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {editPost ? "Edit " : "Create User Profile"}
        </Typography>
        {errors && errors?.message && (
          <Typography color="error" align="center" variant="h6">
            {errors?.message}
          </Typography>
        )}
        <div>
          <TextField
            name="name"
            required
            variant="outlined"
            label="Name"
            fullWidth
            error={errors && errors.name ? true : false}
            helperText={errors && errors.name ? errors?.name : null}
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
          <TextField
            name="title"
            required
            variant="outlined"
            label="Profile Image URL"
            fullWidth
            error={errors && errors.Image ? true : false}
            helperText={errors && errors.Image ? errors?.Image : null}
            value={profileData.Image}
            onChange={(e) =>
              setProfileData({ ...profileData, Image: e.target.value })
            }
          />
          {profileData && profileData.Image && (
            <div style={{ textAlign: "center" }}>
              <img
                src={profileData.Image}
                alt={profileData.name}
                height="100px"
                width="100px"
              />
            </div>
          )}
        </div>
        <div className={classes.wrapper}>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={loading}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          disabled={loading}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
