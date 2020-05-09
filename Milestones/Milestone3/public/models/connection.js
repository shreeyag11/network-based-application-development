class Connection {
    constructor(conn_id, conn_name, conn_topic, conn_details, conn_location, conn_host, conn_date, conn_timeFrom, conn_timeTo, conn_image) {
        this._conn_id = conn_id;
        this._conn_name = conn_name;
        this._conn_topic = conn_topic;
        this._conn_details = conn_details;
		this._conn_location = conn_location;
		this._conn_host = conn_host;
		this._conn_date = conn_date;
		this._conn_timeFrom = conn_timeFrom;
		this._conn_timeTo = conn_timeTo;
		this._conn_image = conn_image;
    }
    get conn_id() {
        return this._conn_id;
	}
	set conn_id(value) {
		this._conn_id = value;
	  }
    get conn_name() {
        return this._conn_name;
	}
	set conn_name(value) {
		this._conn_name = value;
	  }
    get conn_topic() {
        return this._conn_topic;
	}
	set conn_topic(value) {
		this._conn_topic = value;
	  }
    get conn_details() {
        return this._conn_details;
	}
	set conn_details(value) {
		this._conn_details = value;
	  }
    get conn_location() {
        return this._conn_location;
	}
	set conn_location(value) {
		this._conn_location = value; 
	  } 
	get conn_host() {
		return this._conn_host;
	}
	set conn_host(value) {
		this._conn_host = value;
	}
	get conn_date() {
		return this._conn_date;
	}

	set conn_date(value) {
		this._conn_date = value;
	}

	get conn_timeFrom() {
		return this._conn_timeFrom;
	}

	set conn_timeFrom(value) {
		this._conn_timeFrom = value;
	}

	get conn_timeTo() {
		return this._conn_timeTo;
	}

	set conn_timeTo(value) {
		this._conn_timeTo = value;
	}

	get conn_image() {
		return this._conn_image;
	}

	set conn_image(value) {
		this._conn_image = value;
	}

  }

  module.exports = Connection;