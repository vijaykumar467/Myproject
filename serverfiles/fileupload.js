var exp = require("express");
var router = exp.Router();
fileupload = require("express-fileupload");

//images upload code
  router.post("/ImageUpload",(req,resp)=>{
          arr=[]
        for(i=0;i<req.files.file1.length;i++)
        {
            cont=req.files.file1[i]
            dt=new Date();
            fname=dt.getTime()+req.files.file1[i].name
            cont.mv("./src/assets/productimages/"+fname)
            arr.push(fname)
        }
        conn.tbl_products.find().sort({_id:-1}).limit(1,(err,result)=>{
            rowid=result[0]._id
            console.log(result)
            conn.tbl_products.update({_id:ObjId(rowid)},{$set:{images:arr}})
        })
        //console.log(arr)
        resp.redirect("http://localhost:4200/admin/products?status=1");
    })

//multi colors images upload code
//images upload code
router.post("/ColorImageUpload",(req,resp)=>{
  Clrarr=[]
for(i=0;i<req.files.file2.length;i++)
{
    cont=req.files.file2[i]
    dt=new Date();
    fname=dt.getTime()+req.files.file2[i].name
    cont.mv("./src/assets/productcolorimages/"+fname)
    Clrarr.push(fname)
}
  conn.tbl_color_image.find().sort({_id:-1}).limit(1,(err,result)=>{
    rowid=result[0]._id
    console.log(result)
    conn.tbl_color_image.update({_id:ObjId(rowid)},{$set:{colorimages:Clrarr}})
})
//console.log(arr)
resp.redirect("http://localhost:4200/admin/addcolors?status=1");
})




module.exports = router;
