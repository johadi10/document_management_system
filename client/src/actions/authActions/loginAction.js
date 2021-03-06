import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../actionTypes';

export default credentials =>
  dispatch =>
    axios.post('/api/v1/users/login', credentials.user)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user,
          token
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.RESPONSE_ERROR,
          message: (error.response.data.message) ?
            error.response.data.message : null
        });
      });
