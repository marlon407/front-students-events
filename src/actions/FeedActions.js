import ActionTypes from '../constants/ActionTypes';
import AppConstants from '../constants/AppConstants';
import Helper from '../utils/RequestUtil';
import { dispatch } from '../dispatchers/AppDispatcher';

export class FeedActions {

    getStudents() {
        const url = `${AppConstants.BASE_URL}students`;
        return Helper.getRequest(url, ActionTypes.GET_STUDENTS);
    }

    saveStudent(data) {
        const url = `${AppConstants.BASE_URL}students`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_STUDENT);
    }

    getStuent(id) {
        const url = `${AppConstants.BASE_URL}students/${id}`;
        return Helper.getRequest(url, ActionTypes.GET_STUDENT);
    }

    getEvents() {
        const url = `${AppConstants.BASE_URL}events`;
        return Helper.getRequest(url, ActionTypes.GET_EVENTS);
    }

    getEvent(id) {
        const url = `${AppConstants.BASE_URL}events/${id}`;
        return Helper.getRequest(url, ActionTypes.GET_EVENT);
    }

    saveEvent(data) {
        const url = `${AppConstants.BASE_URL}events`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_EVENT);
    }

    getProfessors() {
        const url = `${AppConstants.BASE_URL}users`;
        return Helper.getRequest(url, ActionTypes.GET_PROFESSORS);
    }

    saveUser(data) {
        const url = `${AppConstants.BASE_URL}users`;
        return Helper.postRequest(url, data, ActionTypes.SAVE_USER);
    }

    getUser(id) {
        const url = `${AppConstants.BASE_URL}users/${id}`;
        return Helper.getRequest(url, ActionTypes.GET_USER);
    }


    sendMessage(message) {
        dispatch(ActionTypes.SEND_MESSAGE, { message });
    }
}

export default new FeedActions();
