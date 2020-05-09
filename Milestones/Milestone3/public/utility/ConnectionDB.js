const connections = [
  {
  "conn_id": 1,
  "conn_name": "Maths",
  "conn_topic": "Education",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
{
  "conn_id": 2,
  "conn_name": "Science",
  "conn_topic": "Education",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
{
  "conn_id": 3,
  "conn_name": "Accounting",
  "conn_topic": "Education",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
{
  "conn_id": 4,
  "conn_name": "Yoga",
  "conn_topic": "Sports and Fitness",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
{
  "conn_id": 5,
  "conn_name": "Badminton",
  "conn_topic": "Sports and Fitness",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
{
  "conn_id": 6,
  "conn_name": "Swimming",
  "conn_topic": "Sports and Fitness",
  "conn_details": "This is a probability class specifically for improving the skills of women.\n",
  "conn_location": "Woodward 123",
  "conn_host": "Norm Niner",
  "conn_date": "Thursday, March 5, 2020",
  "conn_timeFrom": "1:30am",
  "conn_timeTo": "3:00pm",
  "conn_image": "norm-user.png"
},
];


class ConnectionDB {

getConnections() {
  return connections;
}

getConnection(conn_id) {
  if (conn_id !== undefined) {
      var connection = connections.filter(connection => connection.conn_id == conn_id);
      return connection[0];
  } else {
      throw new Error("The connection ID is invalid");
  }
}

getTopics() {
  var conn_topics = new Array();
  connections.forEach(connection => {
      if (!conn_topics.includes(connection.conn_topic)) {
          conn_topics.push(connection.conn_topic);
      }
  });

  if (conn_topics !== undefined) {
      return conn_topics;
  }
}
}

module.exports = ConnectionDB;
