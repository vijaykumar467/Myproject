var exp = require('express');
var router = exp.Router();
var jwt = require('jsonwebtoken');

var nodeMail = require('nodemailer');
MailData = nodeMail.createTransport({
    service: "Gmail",
    auth: {
              user: "vijay.e467@gmail.com",
              pass: "8099286518@cv"
          }
})

//user registration code
router.post('/UserRegistration', (req, resp)=>{
  abc = req.body;
  abc.ActivationLink = 0;
  Existmail = abc.Email;
  abc.ActiveMailId = Existmail;

  conn.tbl_register.save(abc, (err, result)=>{
    if(err){
      resp.send(err)
    }
    else{
         string = "Activation Link <a href='http://localhost:4200/user/activate?"+Existmail+" '>Click Here</a>";
         MailData.sendMail({
            from: 'vijay.e467@gmail.com',
            to: Existmail,
            subject: 'User Activation Link',
            html: string
         }, (err, result)=>{
            resp.send(err)

            resp.send(result)
         })
     }
  })
})

//user login with token generation
router.post('/UserLogin', (req, resp)=>{

  console.log(req.body);
       conn.tbl_register.find(req.body, (err, result)=>{
          console.log(result)

        if(result.length == 1){
             payload = {
              UserName: result[0].UserName,
              Email: result[0].Email,
              UserId: result[0]._id,
              ActivationLink: result[0].ActivationLink
             }
             secKey="$%#&"
             UserToken = jwt.sign(payload, secKey, {expiresIn:"2h"})
             console.log(UserToken);
             resp.send({resp:UserToken})
          }

        else{
          resp.send({resp:0});
        }

   })
})



router.post('/UserActivationConfirm', (req, resp)=>{
    conn.tbl_register.update(req.body, {$set: {ActivationLink: 1}}, (err, result)=>{
        if(err){
          resp.send(err)
        }else{
          resp.send({resp: "Account Activation Success...!"});
        }
    })
})

//cart data send to database table
router.post('/CartDataToDb', (req, resp)=>{
      data = req.body
      data.UserId = req.body.UserId
      conn.tbl_cartdata_db.save(data, (err, result)=>{
        resp.send({resp: "Data moved to DB"})
     })
})


//getting database cart items into fronted
router.post('/GetCartdataToUserCart', (req, resp)=>{
      var UID = req.body.UserId;
       // console.log(UID)
  conn.tbl_cartdata_db.find({UserId: UID}).toArray((err, result)=>{
      resp.send(result);
  })
})

//delete the db-cart record in user cart
router.post('/DeleteDbCartItem', (req, resp)=>{
     var Del_Id = ObjId(req.body._id)
     conn.tbl_cartdata_db.remove({_id: Del_Id},(err, result)=>{
       if(err)
       resp.send(err)
       else
       resp.send({resp: "Deleted item"});
     })
})

//update the database cart itemes code
router.post('/UpdateDbCartItems', (req, resp)=>{
  PID=req.body.data.pid;
  conn.tbl_cartdata_db.update({pid: PID}, {$set: {selquantity: req.body.data.count}}, (err, result)=>{
     resp.send(result);
  })
})



//get the user registered data from database in payment process
router.post('/GetUserRegisterData', (req, resp)=>{
       UID = ObjId(req.body.uid);
      conn.tbl_register.find({_id: UID}, (err, result)=>{
          resp.send(result)
         // console.log(result)
      })
})

//User register data updating code
router.post('/UpdateUserRegisterData', (req, resp)=>{
    rowid = req.body[0]._id.toString();
    conn.tbl_register.update({_id: ObjId(rowid)},{$set: req.body[1]}, (err, result)=>{
      if(err)
        resp.send(err)
      else
        resp.send(result)
    })
})


//search the products in user module
router.post("/getSearchData",(req,res)=>{
  //console.log(req.body)
  conn.tbl_products.find({ProductName:{$regex:req.body.txt}}, (err,result)=>{
         //console.log(result)
         res.send(result)
     })
  })



//get the products orders from two tables
router.post('/GetProductsOrders', (req, resp)=>{
   uid = req.body.UserId
  //console.log(uid);
     conn.tbl_orders.aggregate([
       {
           $match: {userid : uid}

       },
         {
           $lookup: {
                from: "tbl_ordered_products",
                localField: "orderid",
                foreignField: "orderid",
                as: "data"
           }
         },
         {"$unwind": "$data"}
     ], (err, result)=>{
         resp.send(result)
        // console.log(result)
     })

})

//cancel the order code
router.post('/DeleteOrder', (req, resp)=>{
  var ID = ObjId(req.body._id)
  console.log(ID)
    conn.tbl_ordered_products.remove({_id: ID}, (err, result)=>{
        if(err)
        resp.send(err);
        else
        resp.send(result)
    })
})














module.exports = router;
