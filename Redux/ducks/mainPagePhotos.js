import axios from "axios";

const GET_PHOTOS = "FETCH_PHOTOS_REQUEST";
const GET_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
const GET_PHOTOS_FAIL = "FETCH_PHOTOS_FAILURE";

export const fetchSavedItemsRequest = () => {
  return { type: GET_PHOTOS };
};

export const fetchSavedItemsSuccess = items => {
  return { type: GET_PHOTOS_SUCCESS, payload: items };
};

export const fetchSavedItemsFailure = err => {
  return { type: GET_PHOTOS_FAIL, payload: err };
};

export const fetchPhotos = url => {
  return dispatch => {
    dispatch(fetchSavedItemsRequest());
    axios
      .get(url)
      .then(response => {
        const photos = response.data;
        dispatch(fetchSavedItemsSuccess(photos));
      })
      .catch(e => {
        dispatch(fetchSavedItemsFailure(e));
      });
  };
};

const initialState = { error: "", loading: false, photos: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return { ...state, loading: true };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.payload
      };
    case GET_PHOTOS_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching repositories"
      };

    default:
      return state;
  }
}
