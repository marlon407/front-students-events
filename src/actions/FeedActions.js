import ActionTypes from '../constants/ActionTypes';
import AppConstants from '../constants/AppConstants';
import Helper from '../utils/RequestUtil';
import { dispatch } from '../dispatchers/AppDispatcher';

export class FeedActions {

    getStudents() {
        const url = `${AppConstants.BASE_URL}students`;
        return Helper.getRequest(url, ActionTypes.GET_STUDENTS);
    }

    getProfessors() {
        const url = `${AppConstants.BASE_URL}users`;
        return Helper.getRequest(url, ActionTypes.GET_PROFESSORS);
    }

    getEvents() {
        const url = `${AppConstants.BASE_URL}events`;
        return Helper.getRequest(url, ActionTypes.GET_EVENTS);
    }

    getEvent(id) {
        const url = `${AppConstants.BASE_URL}events/${id}`;
        return Helper.getRequest(url, ActionTypes.GET_EVENT);
    }

    saveStudent(data) {
        const url = `${AppConstants.BASE_URL}students`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_STUDENT);
    }

    saveUser(data) {
        const url = `${AppConstants.BASE_URL}users`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_USER);
    }

    saveEvent(data) {
        const url = `${AppConstants.BASE_URL}events`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_EVENT);
    }

    sendMessage(message) {
        dispatch(ActionTypes.SEND_MESSAGE, { message });
    }
}

export default new FeedActions();
