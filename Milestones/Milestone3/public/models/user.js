class User {
    constructor(user_id, user_fname, user_lname, user_email,address1, address2, city, state, zip, country) {
        this._user_id = user_id;
        this._user_fname = user_fname;
        this._user_lname = user_lname;
        this._user_email = user_email;
        this._address1 = address1;
        this._address2 = address2;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this._country = country;
    }
    get user_id() {
        return this._user_id;
    }
    set user_id(value) {
        this._user_id = value;
      }
    get user_fname() {
        return this._user_fname;
    }
    set user_fname(value) {
        this._user_fname = value;
      }
    get user_lname() {
        return this._user_lname;
    }
    set user_lname(value) {
        this._user_lname = value;
      }
    get user_email() {
        return this._user_email;
    }
    set user_email(value) {
      this._user_email = value;
    }
    get address1() {
        return this._address1;
    }
    set address1(value) {
      this._address1 = value;
    }
    get address2() {
        return this._address2;
    }
    set address2(value) {
      this._address2 = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
      this._city = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
      this._state = value;
    }
    
    get zip() {
        return this._zip;
    }
    set zip(value) {
      this._zip = value;
    }
    
    get country() {
        return this._country;
    }
    set country(value) {
      this._country = value;
    }
  }
  module.exports = User;
