import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  Grid,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import Profile from "../Profile/Profile";
import useStyles from "./Profiles-styles";
import * as action from "../../store/actions/index";

const Profiles = ({ setEditId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileReducer);

  const [searchValue, setSearchValue] = useState("");
  const [profileList, setProfileList] = useState(null);

  useEffect(() => {
    dispatch(action.getProfiles());
  }, []);

  useEffect(() => {
    if (profileData && profileData.profiles) {
      setProfileList([...profileData.profiles]);
    }
  }, [profileData]);

  const handleSearch = (searchvalue) => {
    setSearchValue(searchvalue);
    const searchedProfile = profileData.profiles.filter((profile) => {
      if (
        profile.name
          .toLowerCase()
          .replace(/\s/g, "")
          .startsWith(searchvalue.toLowerCase().replace(/\s/g, ""))
      ) {
        return profile;
      }
    });
    setProfileList([...searchedProfile]);
  };

  return profileData.loading ? (
    <CircularProgress />
  ) : profileData && profileData.profiles && profileData.profiles.length > 0 ? (
    <>
      <div style={{ marginBottom: "20px" }}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="search">Search</InputLabel>
          <OutlinedInput
            placeholder="Search users"
            id="search"
            name="search"
            title="Search"
            variant="outlined"
            label="Search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl>
      </div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {profileList && profileList.length > 0 ? (
          profileList.map((profile) => (
            <Grid key={profile._id} item xs={12} sm={6} md={6}>
              <Profile profile={profile} setEditId={setEditId} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">
            No users found with {searchValue}
          </Typography>
        )}
      </Grid>
    </>
  ) : (
    <Typography variant="h6">No users found</Typography>
  );
};

export default Profiles;
