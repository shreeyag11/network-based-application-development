module.exports = class connection {
    constructor(conn_id, conn_name, conn_topic, details, date_time) {
        this.conn_id = conn_id;
        this.conn_name = conn_name;
        this.conn_topic = conn_topic;
        this.details = details;
        this.date_time = date_time;
        this.location = location;
    }
    
    get conn_id() {
        return this.conn_id;
    }
    get conn_name() {
        return this.conn_name;
    }
    get conn_topic() {
        return this.conn_topic;
    }
    get details() {
        return this.details;
    }
    get date_time() {
        return this.date_time;
    }
    get location() {
        return this.location;
    }
    set conn_id(value) {
      this.conn_id = value;
    }
    set conn_name(value) {
      this.conn_name = value;
    }
    set conn_topic(value) {
      this.conn_topic = value;
    }
    set details(value) {
      this.details = value;
    }
    set date_time(value) {
      this.date_time = value;
    }
    set location(value) {
      this.location = value; 
    }
  }