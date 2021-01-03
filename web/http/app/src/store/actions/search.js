import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START
  };
};

export const fetchSuccess = (results) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    payload: { results },
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_FAIL,
    error: error
  };
};

export const fetchSearchResults = (query) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios.get(`/get_results`, {
      params: {
        q: query
      }
    }).then(res => {
      const {results} = res.data;
      dispatch(fetchSuccess(results));
    }).catch((error) => {
      fetchFail(error)
    })
  }
};
