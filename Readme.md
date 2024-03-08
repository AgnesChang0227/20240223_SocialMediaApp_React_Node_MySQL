# Social Web 
### With Node.js, React and MySQL
![Homepage](https://res.cloudinary.com/drdhtjh7o/image/upload/v1709860219/SocialWeb_capture/homepage.png)
***
### Description:
This is a Social Media Website created using node.js, React, and MySQL. The content is based on a tutorial( Youtube: <https://www.youtube.com/watch?v=1EuNnZEp2sQ>, Github:<https://github.com/safak/youtube2022/tree/social-app>) , and later modified and enhanced with additional functions.

### Functions:
1. Authentication: Login, Logout, ForgotPassword, Verify Email, Reset Password
2. Posts: Create/Delete posts, Likes/Unlike posts, Leave comments under the post
3. Follows: Follow/Unfollow user, List Friends(mutual followers), Latest Activities(according to the followed user), Recommend users to follow
4. Others: Upload image to Cloudinary

#### Considered functions to be added and improved:
1. Search users by name
2. Search posts by keywords
3. Delete comments
4. WebSocket

***
### Installation and Running Instructions:
1. Run `npm install` command in both the api and client directories to **install all the required node modules**.
2. **Replace the elements** `process.env.xxx` with your own data.
3. Create the MySQL database tables and utilize `/api/fakeDataGen.js` to **generate fake data**.
4. Run `npm start` to **start the server** on both the API and client sides.

***
### Modules used:

#### Client side:
- MUI
- Axios
- Formik
- Yup
- React-query

#### Server side:
- Express
- Mysql
- Cors
- JWT
- Bcrypt
- DotEnv
- Nodemailer
- Multer
- Cloudinary
***