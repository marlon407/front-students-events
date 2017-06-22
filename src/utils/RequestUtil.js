import { dispatch } from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ActionTypes from '../constants/ActionTypes';
import request from 'request';
import bluebird from 'bluebird';

class RequestUtil {

  getRequest(url, callback){
    return new bluebird( (resolve, reject) => {
        request.get({
            url: url,
            headers: {
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        },
        (err, response, body) => {
            if (response.statusCode >= 400) {
              dispatch(ActionTypes.SEND_MESSAGE, {message: response.statusMessage});
              return;
            }
            if(err){ return reject(err);}
            dispatch(callback, {data:JSON.parse(body)});
        });
    });
  }

  postRequest(url, data, callback){
      return new bluebird( (resolve, reject) => {
          request.post({
              url: url,
              body:JSON.stringify(data),
              headers: {
                  'Authorization': "Bearer " +localStorage.getItem('token'),
                  'Content-Type': 'application/json',
              }
          },
          (err, response, body) => {
              if (response.statusCode >= 400) {
                dispatch(ActionTypes.SEND_MESSAGE, {message: response.statusMessage});
                return;
              }
              if(err){ return reject(err);}
              dispatch(callback, JSON.parse(body));
          });
      });
  }



}

export default new RequestUtil();
