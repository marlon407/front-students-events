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
        console.log(decoded.role);
        return decoded.role;
      }
      return "";
    }

    isLoogedIn() { return this.loggedIn; }

    _registerToActions(action) {
        switch (action.type) {
        case ActionTypes.LOGIN:
          this.setLogin(action.token);
          this.loggedIn = true;
          this.emitChange();
          break;
        default:
          break;
        }
    }
}
export default new MainStore();
