var exp = require('express');
var router = exp.Router();
var jwt = require('jsonwebtoken')

router.post('/adminlogin', (req, resp)=>{
  console.log(req.body);
       conn.tbl_adminlogins.find(req.body, (err, result)=>{
          console.log(result)
        if(result.length == 1){

             payload = {
                 username: result[0].uname,
                 userrole: result[0].role
             }
             secKey="$%#&"
             token = jwt.sign(payload, secKey, {expiresIn:"2h"})
             console.log(token);
             resp.send({resp:token})
          }

        else{
          resp.send({resp:0});
        }

       })
})

module.exports = router;


