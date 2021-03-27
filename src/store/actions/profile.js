import * as actionType from "./actionType";
import { axiosClient } from "../../axios";

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_PROFILES });
    const { data: profiles } = await axiosClient.get("/profiles");
    console.log(profiles);
    dispatch({ type: actionType.GET_PROFILES_SUCCESS, profiles });
  } catch (error) {
    console.log(error);
  }
};

export const createProfile = (formData) => async (dispatch) => {
  console.log(formData);
  dispatch({ type: actionType.CREATE_PROFILE });
  try {
    const { data: profile } = await axiosClient.post(
      "/profiles/createProfile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    dispatch({ type: actionType.CREATE_PROFILE_SUCCESS, profile });
  } catch (error) {
    dispatch({
      type: actionType.CREATE_PROFILE_FAIL,
      errors: error?.response?.data,
    });
  }
};

export const updateProfile = (id, formData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_PROFILE });
  try {
    const { data: updatedProfile } = await axiosClient.patch(
      `/profiles/updateProfile/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    dispatch({ type: actionType.UPDATE_SUCCESS, updatedProfile });
  } catch (error) {
    dispatch({ type: actionType.UPDATE_FAIL, errors: error?.response?.data });
  }
};

export const deleteProfile = (id) => async (dispatch) => {
  try {
    await axiosClient.delete(`/profiles/deleteProfile/${id}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
      },
    });
    dispatch({ type: actionType.DELETE_SUCCESS, id });
  } catch (error) {
    console.log(error);
  }
};
