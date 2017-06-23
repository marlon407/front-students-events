import ActionTypes from '../constants/ActionTypes';
import AppConstants from '../constants/AppConstants';
import Helper from '../utils/RequestUtil';
import { dispatch } from '../dispatchers/AppDispatcher';

class MainActions {

    login(username, password) {
        const url = `${AppConstants.BASE_URL}auth/login`;
        return Helper.postRequest(url, {username, password} ,ActionTypes.LOGIN);
    }

    sendMessage(message) {
        dispatch(ActionTypes.SEND_MESSAGE, { message });
    }
}

export default new MainActions();