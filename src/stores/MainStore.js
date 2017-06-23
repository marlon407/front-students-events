import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';
import jwt from  'jwt-decode';

class MainStore extends BaseStore{

  constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this));
      this.token = null;
      this.login = null;
      this.loggedIn = false;
      this.message = null;
    }

    setLogin(login){
      localStorage.setItem('token',login)
      this.token = login;
    }
    getLogin(){return this.token;}

    getRole() {
      const token = localStorage.getItem('token')
      if(token){
        const decoded = jwt(token);
        return decoded.role;
      }
      return "";
    }

    setMessage(message){ this.message = message; }
    getMessage(){ 
      const message = this.message;
      this.message = null;
      return message; 
    }

    isLoogedIn() { 
      const token = localStorage.getItem('token')
      return token ? true: false;
    }

    _registerToActions(action) {
        switch (action.type) {
        case ActionTypes.LOGIN:
          this.setLogin(action.token);
          this.loggedIn = true;
          this.emitChange();
          break;
        case ActionTypes.SEND_MESSAGE:
          this.setMessage(action.message);
          this.emitChange()
          break
        default:
          break;
        }
    }
}
export default new MainStore();
