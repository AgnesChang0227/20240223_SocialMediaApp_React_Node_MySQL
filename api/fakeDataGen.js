// gen fake data for testing

import {db} from "./services/connect.js";
import {faker} from "@faker-js/faker";
import moment from "moment";

const userStatus = ["verified", "unverified"]
const randomDate = (date) => {
  const startFrom = date || '2020-01-01T00:00:00.000Z'
  return moment(faker.date.between(
    {from: startFrom, to: '2024-03-07T00:00:00.000Z'}))
    .format("YYYY-MM-DD HH:mm:ss");
}
const randomArr = (arr) => {
  const randomElements = [];

  // 確保 count 不超過數組的長度
  const count = Math.floor(1 + Math.random() * arr.length);

  while (randomElements.length < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];

    // 確保不重複添加元素
    if (!randomElements.includes(randomElement)) {
      randomElements.push(randomElement);
    }
  }

  return randomElements;
}

function asyncQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

}

const affectedCount = {
  users: 0,
  profiles: 0,
  posts: 0,
  relationships: 0,
  comments: 0,
  likes: 0,
}
//users+posts+profiles * 1
const genUPPData = new Promise ((resolve) => {
  for (let i = 0; i <100 ; i++) {
    genOnce()
  }
  resolve("user data");
  function genOnce (){
    //user
    const q = "INSERT INTO users (`email`, `password`, `status`, `verifyCode`, `createdAt`) VALUE (?)"
    const values = [
      faker.internet.email(),
      "$2b$10$3n5HWQWdjX2FNYpix1JQ/uqJnlfFB1CLywAAPrwTBr7FJtUgxkcIG",//12341234
      userStatus[Math.floor(Math.random() * userStatus.length)],
      "",
      randomDate(),
    ]
    db.query(q, [values], (err, data) => {
      if (err) return console.log(err);
      affectedCount.users += data.affectedRows;

      //profiles
      const q = "INSERT INTO profiles (`userId`, `name`, `desc`, `profilePic`, `coverPic`,`city`,`website`,`lastEdited`) VALUE (?)"
      const pValues = [
        data.insertId,
        values[0].slice(0, values[0].indexOf("@")),
        faker.lorem.paragraph(),
        faker.image.url(),
        faker.image.url(),
        faker.location.city(),
        faker.internet.url(),
        randomDate(values[4])
      ]
      db.query(q, [pValues], async (err, pData) => {
        if (err) return console.log(err);
        affectedCount.profiles += pData.affectedRows;
        let rows = [];
        const count = Math.floor(1 + Math.random() * 10);
        for (let i = 0; i < count; i++) {
          const post = {
            userId: data.insertId,
            desc: faker.lorem.paragraph(),
            img: faker.image.url(),
            createdAt: randomDate(values[4])
          }
          rows.push(post)
        }
        //posts
        const q = "INSERT INTO posts (`userId`, `desc`, `img`, `createdAt`) VALUE ?"
        rows = rows.map(row => [row.userId, row.desc, row.img, row.createdAt,]);
        db.query(q, [rows], (err, postData) => {
          if (err) return console.log(err);
          affectedCount.posts += postData.affectedRows;

          // console.log(postData.insertId)
        })
      })
    })
  }
})

//comments+likes+relationships for all users
const genCLRData =  new Promise( (resolve) => {
  const num = Math.floor(1 + Math.random() * 100);//1-100
  const q = "SELECT id,createdAt FROM users";
  db.query(q, async (err, usersData) => {
    if (err) return console.log(err);
    for (let i = 0; i < usersData.length; i++) {
      const targetUserId = usersData[i].id;

      //relationship
      let q = `INSERT INTO relationships (followerUserId, followedUserId) VALUE ?`
      //followed users id
      let randomUsers = usersData.slice(0,usersData.length-1);
      randomUsers.splice(i, 1);
      randomUsers = randomArr(randomUsers);
      let values = randomUsers.map(user => [targetUserId, user.id]);
      try {
        const rData = await asyncQuery(q, [values])
        affectedCount.relationships += rData.affectedRows;
        // console.log("follow users:", rData.message);

        //get random posts
        const pQuery = "SELECT id FROM posts ORDER BY RAND() LIMIT ?"
        let pData = await asyncQuery(pQuery, [Math.floor(1 + Math.random() * 100)]);

        //  comments
        q = "INSERT INTO comments (postid, userid, `desc`, createdAt) VALUE ?"
        let arr = []
        for (let j = 0; j < pData.length; j++) {
          arr.push([
            pData[j].id,
            targetUserId,
            faker.lorem.paragraph(1),
            randomDate(usersData[i].createdAt)
          ])
        }
        const cData = await asyncQuery(q, [arr]);
        affectedCount.comments += cData.affectedRows;
        // console.log("comments: ",cData.message)

        //  likes
        pData = await asyncQuery(pQuery, [Math.floor(1 + Math.random() * 100)]);
        q = "INSERT INTO likes (postId,userId) VALUE ?"
        arr = [];
        for (let j = 0; j < pData.length; j++) {
          arr.push([
            pData[j].id,
            targetUserId,
          ])
        }
        const lData = await asyncQuery(q, [arr]);
        affectedCount.likes += lData.affectedRows
        // console.log("likes: ",lData.message)

      } catch (err) {
        console.log(err)
      }

    }
    resolve("data2")
  })
})

Promise.all([genUPPData,genCLRData]).then(r=>{
  console.log("finish",r)
  console.log(affectedCount)
  process.exit();
})

