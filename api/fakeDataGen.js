// gen fake data for testing

import {db} from "./services/connect.js";
import {faker} from "@faker-js/faker";
import moment from "moment";

const userStatus = ["verified", "unverified"]
const randomDate =
  moment(faker.date.between(
    {from: '2020-01-01T00:00:00.000Z', to: '2024-03-07T00:00:00.000Z'}))
    .format("YYYY-MM-DD HH:mm:ss");

//users
const genUser = () => {
  const q = "INSERT INTO users (`email`, `password`, `status`, `verifyCode`, `createdAt`) VALUE (?)"
  const values = [
    faker.internet.email(),
    "$2b$10$3n5HWQWdjX2FNYpix1JQ/uqJnlfFB1CLywAAPrwTBr7FJtUgxkcIG",//12341234
    userStatus[Math.floor(Math.random() * userStatus.length)],
    "",
    randomDate,
  ]
  db.query(q,[values],(err,data)=>{
    if (err) return console.log(err);
    console.log("success");
  })
  console.log(values)
}
genUser();
//profile
//relationships
//posts
//comments
//likes

