var Connection = require('./../models/connection.js');

var datab = [
  {
      conn_id: "1",
      conn_name: "Maths",
      conn_topic: "Education",
      details: "This is a probability class specifically for improving the skills of women.\n",
      date_time: "10/18/2019 10.00 AM to 1.00 PM",
      location: "Woodward 212",
  },
  {
      conn_id: "2",
      conn_name: "Science",
      conn_topic: "Education",
      details: "This is a science class specifically for improving the skills of women.\n",
      date_time: "10/25/2019 10.00 AM to 1.00 PM",
      location: "Woodward 213",
    },
  {
      conn_id: "3",
      conn_name: "Accounting",
      conn_topic: "Education",
      details: "This is a accounting class specifically for improving the skills of women.\n",
      date_time: "10/20/2019 10.00 AM to 1.00 PM",
      location: "Woodward 214",
  },
  {
      conn_id: "4",
      conn_name: "Yoga",
      conn_topic: "Sports and Fitness",
      details: "This is a sports class specifically for improving the skills of women.\n",
      date_time: "10/21/2019 10.00 AM to 1.00 PM",
      location: "Woodward 216",
   },
  {
      conn_id: "5",
      conn_name: "Badminton",
      conn_topic: "Sports and Fitness",
      details: "This is a badminton class specifically for improving the skills of women.\n",
      date_time: "10/22/2019 10.00 AM to 1.00 PM",
      location: "Woodward 217",
  },
  {
      conn_id: "6",
      conn_name: "Swimming",
      conn_topic: "Sports and Fitness",
      details: "This is a swimming class specifically for improving the skills of women.\n",
      date_time: "10/23/2019 10.00 AM to 1.00 PM",
      location: "Woodward 218",
  },

];

module.exports.getConnections = function(ret) {  
  ret(datab);

};

module.exports.getConnection = function(conn_id, ret)
{
  
  for (var i = 0; i < datab.length; i++) {
    if (datab[i].conn_id === conn_id) {
      ret(datab[i]);
      return;
    }
    if(i==datab.length-1){
      ret(null);
      return;}
  }
};
