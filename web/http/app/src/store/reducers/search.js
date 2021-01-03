import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const fetchStart = () => {
  return updateObject(initialState, {
    loading: true,
  });
};

const fetchSuccess = ({ payload }) => {
  return updateObject(initialState, {
    ...payload,
  });
};

const fetchFail = ({ error = null }) => {
  return updateObject(initialState, {
    error,
  });
};

const searchReducer = (state = initialState, action)  => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return fetchStart(state);
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(action);
    case actionTypes.FETCH_FAIL:
      return fetchFail(action);
    default:
      return state;
  }
};

export default searchReducer

