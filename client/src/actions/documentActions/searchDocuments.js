import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export default (token, documentName, all = true) => {
  const decodedToken = jwtDecode(token);
  let route = '/api/v1/users/documents';
  if (all === true) {
    route = (decodedToken.RoleId === 1) ? '/api/v1/search/documents'
      : '/api/v1/documents/accessible';
  }
  return dispatch =>
    axios.get(`${route}?q=${documentName}`, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.SEARCH_DOCUMENTS,
        documents: response.data.data.documents,
        pageCount: response.data.data.paginationMeta.pageCount
      });
    }).catch((error) => {
      dispatch({
        type: actionTypes.RESPONSE_ERROR,
        message: (error.response && error.response.data.message) ?
          error.response.data.message : error.response.data.errors
      });
    });
};