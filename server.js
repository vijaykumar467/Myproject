var exp = require('express');
var app = exp();

var bp = require('body-parser');
app.use(bp.json());

var cors = require('cors');
app.use(cors());

var jwt = require('jsonwebtoken');

 nodeMail = require('nodemailer');
 transport=nodeMail.createTransport({
service:"Gmail",
auth:{
    user:"aswankalyanreddy@gmail.com",
    pass:"10gj1a0207"
}
})

var mongojs = require('mongojs')
ObjId = mongojs.ObjectId;

fileUpload = require("express-fileupload");
app.use(fileUpload()); 

conn=mongojs('mongodb://localhost:27017/EcommerceProject') //mongodb connection

var adminLogin = require('./serverfiles/admin');  // admin.js path
app.use('/adminpath', adminLogin);


var Category = require('./serverfiles/category')// category.js path
app.use('/CatPath', Category)

var Subcat = require('./serverfiles/subcategory')// subcategory.js path
app.use('/SubcatPath', Subcat)

var Subsubcat = require('./serverfiles/subsubcategory');// subsubcategory.js path
app.use('/SubsubPath', Subsubcat);

var BrandCtrl = require('./serverfiles/brand');// brand.js path
app.use('/BrandPath', BrandCtrl)

var ProductUrl = require('./serverfiles/products');//product.js  path
app.use('/ProductPath', ProductUrl)


var UploadFile = require("./serverfiles/fileupload"); //fileupload.js path
app.use('/FileUpload', UploadFile)

var UserReg = require('./serverfiles/user'); //user register path
app.use('/UserPath', UserReg);

var PaymentMethod = require('./serverfiles/payment');//payment path
app.use('/PaymentPath', PaymentMethod);

var WishList = require('./serverfiles/wishlist'); //wish list path
app.use('/WishlistPath', WishList);


app.listen(3000);
console.log('sever started');
