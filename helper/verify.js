// const jwt = require("jsonwebtoken");
 const verifyToken = (req,res,next)=>{
  let a = '1';
  let b = '1';
  if(a == b) {
    next()
  }else {
    console.log('not matched')
  }
}
module.exports = verifyToken
