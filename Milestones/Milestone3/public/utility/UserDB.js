var usersData = [
  {
    user_id: 1,
    user_fname: 'Shreeya',
    user_lname: 'Gupta',
    email: 'sgupta42@uncc.edu',
    address1: '9544 University Terrace Drive',
    address2: 'Apt J',
    city: "Charlotte",
    state: "NC",
    zip: 28262, 
    country: 'USA'
  }
  ]
  module.exports.getUser = function() {
  return usersData[0];
  }


