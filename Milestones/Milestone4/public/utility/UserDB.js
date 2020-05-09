let usersDB = require("../models/user");

var mongoose = require("mongoose");
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var usersSchema = new mongoose.Schema({
  user_id: String,
  user_fname: String,
  user_lname: String,
  email: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String, 
  country: String,
});


users = mongoose.model('usersData', usersSchema);

// addUser = async function(){
//   return new Promise((resolve, reject)=>{
//     new users({user_id: 'sgupta42',
//     user_fname: 'Shreeya',
//     user_lname: 'Gupta',
//     email: 'sgupta42@uncc.edu',
//     address1: '9544 University Terrace Drive',
//     address2: 'Apt J',
//     city: "Charlotte",
//     state: "NC",
//     zip: 28262, 
//    country: 'USA'}).save().then(conn =>{
//      console.log('User Saved:',conn);
//      resolve(conn);
//    }).catch(err => {
//     return reject(err);
// });
//   })
// }

  getUser= async function() {
    return new Promise((resolve,reject) => {
        users
        .find({})
          .then(conn => {
             console.log("user data: ",conn);
              let userObj = new usersDB(conn[0].user_id, conn[0].user_fname, conn[0].user_lname, conn[0].email,conn[0].address1, conn[0].address2, conn[0].city, conn[0].state, conn[0].zip, conn[0].country);
              // userObj.setuser_id(conn[0].user_id);
              // userObj.setuser_fname(conn[0].user_fname);
              // userObj.setuser_lname(conn[0].user_lname);
              // userObj.setuser_email(conn[0].email);
              // userObj.setaddress1(conn[0].address1);
              // userObj.setaddress2(conn[0].address2);
              // userObj.setcity(conn[0].city);
              // userObj.setstate(conn[0].state);
              // userObj.setzip(conn[0].zip);
              // userObj.setcountry(conn[0].country);
            console.log(userObj);
            resolve(userObj);
          })
          .catch(err => {
            return reject(err);
        });
    });
    }

  module.exports = {getUser};