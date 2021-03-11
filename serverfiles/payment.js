var exp = require('express')
router = exp.Router();
var request= require('request');


var OrderMail = require('nodemailer');
   MailData = OrderMail.createTransport({
      service: "Gmail",
      auth: {
              user: 'vijay.e467@gmail.com',
              pass: '8099286518@CV'
      }
   })

router.post('/PaymentMethod', (req, resp)=> {

  var headers = { 'X-Api-Key': '70df8223e8eada9cd929ad9fae5c35da ', 'X-Auth-Token': '3a7041c4ff52ec47f2b584dc05e5f6ce'}
  var payload = {
    purpose: 'Shoppy@V',
    amount: '10',
    phone: '8099286518',
    buyer_name: 'vijay',
    redirect_url: 'http://localhost:4200/user/paymentreceipt/',
    send_email: true,
    webhook: 'http://www.example.com/webhook/',
    send_sms: true,
    email: 'charan.e467@gmail.com',
    allow_repeated_payments: false}

  request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
    if(!error && response.statusCode == 201){
      console.log(body);
      resp.send({resp:body})
    }

  })

})


//sending the database cart items into orderd table code based on userid
router.post('/PaymentSuccess', (req, resp)=>{
    uid= req.body.UserId;
   // console.log(uid)
    oid = req.body.orderid
    //console.log(oid)
    nstr="";
    cart_array = [];
    var obj = {};
   conn.tbl_cartdata_db.find({UserId: uid}, (err, result)=>{
       for(var i=0; i<result.length; i++){
          obj = {};
          obj.pid = result[i]._id;
          obj.productname=result[i].productname
          obj.newprice=result[i].newprice
          obj.color=result[i].selColor
          obj.size=result[i].selSize
          obj.qty=result[i].selquantity,
          obj.img= result[i].image,
          obj.userid = uid;
          obj.orderid = oid
          cart_array.push(obj)
          nstr+=`<li>ProductName: ${obj.productname}- Quantity:${obj.qty}- Price: ${obj.newprice}</li>`
       }
       console.log(cart_array);
       //store ordered table
       conn.tbl_ordered_products.save(cart_array);
       var date = new Date();
       conn.tbl_orders.save({orderid: oid, userid: uid, date: Date()});
       conn.tbl_cartdata_db.remove({UserId: uid});

   })
   //save delivery address code
   console.log(uid)
      conn.tbl_register.find({_id: ObjId(uid)}, (err, result)=>{
          resp.send(result)
          console.log(result)
          var data ={};
          address_array = []
          for(var i=0; i<result.length; i++)
          {
            data.name = result[i].UserName,
            data.email = result[i].Email,
            data.mobile = result[i].Mobile,
            data.address = result[i].Address,
            data.userid = uid,
            data.orderid = oid,
            data.date = Date(),
            address_array.push(data)
          }
          conn.tbl_Delivery_Address.save(address_array);

        //send mail to customer about order products
        var mailstr=`<div style='color:white;background-color:blue'>
        Your Order Receipt</div><br><span style='color:red;font-weight:bold'><b>OrderId:${oid}</b></span>
        <br>Products<hr>${nstr}`
           DeiveryEmail = data.email;
           console.log(DeiveryEmail);
           OrderDelivery = "hiiiiii";
           MailData.sendMail({
             from: "vijay.e467@gmail.com",
             to : "vijay.e467@gmail.com",
             subject: "Deliver Confirmation",
             html: mailstr
            // html: ''
           }, (err, body)=>{
             if(err)
             console.log(err)
             else
             console.log(body)
           })
          console.log(mailstr)
      })

})










module.exports = router
