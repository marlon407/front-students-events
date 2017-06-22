import ActionTypes from '../constants/ActionTypes';
import AppConstants from '../constants/AppConstants';
import Helper from '../utils/RequestUtil';
import { dispatch } from '../dispatchers/AppDispatcher';

class MainActions {

    login(username, password) {
        console.log("login actions");
        const url = `${AppConstants.BASE_URL}auth/login`;
        return Helper.postRequest(url, {username, password} ,ActionTypes.LOGIN);
    }

    updateStatus(message) {
        const url = `${AppConstants.BASE_URL}status`;
        const data = {
          "text": message,
          "user": "1"
        }
        return Helper.postRequest(url, data, ActionTypes.NEW_POST);
    }

    getFriends() {
        const url = `${AppConstants.BASE_URL}friends?pageSize=20&pageNumber=1`;
        return Helper.getRequest(url, ActionTypes.GET_FRIENDS);
    }

    sendMessage(message) {
        dispatch(ActionTypes.SEND_MESSAGE, { message });
    }
}

export default new MainActions();