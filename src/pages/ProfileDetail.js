import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { axiosClient } from "../axios";
import Profile from "../components/Profile/Profile";

export const ProfileDetail = () => {
  const location = useLocation();
  const [profileDetail, setProfileDetail] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/profiles/${location.pathname.split("/")[2]}`)
      .then((res) => {
        console.log(res);
        setProfileDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !profileDetail ? (
    <div style={{ textAlign:'center' }}>
      <Typography variant="body1" gutterBottom>
        Fetching Details..
      </Typography>
    </div>
  ) : (
    <div style={{ margin: "auto", maxWidth: "50%" }}>
      <Profile profile={profileDetail} />
    </div>
  );
};

export default ProfileDetail;
