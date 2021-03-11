 
 nodeMail = require('nodemailer');
 transport=nodeMail.createTransport({
service:"Gmail",
auth:{
    user:"aswankalyanreddy@gmail.com",
    pass:"10gj1a0207"
}
})
 transport.sendMail({
         to:'vijay.e467@gmail.com',
         subject:"Order Info",
         from:"aswankalyanreddy@gmail.com",
         text:'scott'
       },(err,body)=>{
        if(err)
        console.log(err)
        else
        console.log(body)
       })