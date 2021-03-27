import * as actionType from "../actions/actionType";

const initState = {
  profiles: null,
  loading: false,
  creating: false,
  errors: null,
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_PROFILES:
      return { ...state, loading: true, errors: null };

    case actionType.GET_PROFILES_SUCCESS:
      return { ...state, profiles: action.profiles, loading: false, errors: null };

    case actionType.CREATE_PROFILE:
      return { ...state, creating: true, errors: null };

    case actionType.CREATE_PROFILE_SUCCESS:
      const tempProfiles = [...state.profiles];
      tempProfiles.unshift(action.profile);
      return {
        ...state,
        profiles: tempProfiles,
        creating: false,
        errors: null,
      };

    case actionType.CREATE_PROFILE_FAIL:
      return {
        ...state,
        errors: action.errors,
        creating: false,
      };

    case actionType.UPDATE_SUCCESS:
    {
      const tempProfiles = [...state.profiles];
      const index = tempProfiles.findIndex(
        (profile) => profile._id === action.updatedProfile._id
      );
      if (index !== -1) {
        tempProfiles[index] = action.updatedProfile;
      }
      return {
        ...state,
        profiles: tempProfiles,
        creating: false,
      };
    }

    case actionType.UPDATE_FAIL:
      return {
        ...state,
        errors: action.errors,
        creating: false,
      };

    case actionType.DELETE_SUCCESS:
      return {
        ...state,
        profiles: state.profiles.filter((profile) => profile._id !== action.id),
      };

    default:
      return state;
  }
};

export default profileReducer;
