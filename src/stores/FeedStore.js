import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';

class FeedStore extends BaseStore{

  constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this));
      this.students = null;
      this.student = null;
      this.professors = null;
      this.user = null;
      this.events = null;
      this.event = null;
      this.message = null;
      this.saved = false;
    }

    setStudents(students){ this.students = students; }
    getStudents(){ return this.students; }

    setStudent(student){ this.student = student; }
    getStudent(){ return this.student; }

    setEvents(data) { this.events = data }
    getEvents() { return this.events }

    setEvent(data) { this.event = data }
    getEvent() { return this.event }

    setUser(data) { this.user = data }
    getUser() { return this.user }

    setProfessors(data) { this.professors = data }
    getProfessors() { return this.professors }

    setSaved() { this.saved = true; }
    getSaved() {
        const saved = this.saved;
        this.saved = false;
        return saved;
    }

    _registerToActions(action) {
        switch (action.type) {
        case ActionTypes.GET_STUDENTS:
          this.setStudents(action.data);
          this.emitChange();
          break;
        case ActionTypes.GET_STUDENT:
          this.setStudent(action.data);
          this.emitChange();
          break;
        case ActionTypes.GET_PROFESSORS:
          this.setProfessors(action.data);
          this.emitChange();
          break;
      case ActionTypes.GET_EVENTS:
          this.setEvents(action.data);
          this.emitChange();
          break;
        case ActionTypes.SAVE_USER:
          this.setSaved();
          this.emitChange();
          break;
        case ActionTypes.GET_USER:
          this.setUser(action.data);
          this.emitChange();
          break;
        case ActionTypes.SAVE_EVENT:
          this.setSaved();
          this.emitChange();
          break;
        case ActionTypes.GET_EVENT:
          this.setEvent(action.data);
          this.emitChange();
          break;
        default:
          break;
        }
    }
}

export default new FeedStore();
