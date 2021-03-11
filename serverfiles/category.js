var exp = require('express');
var router = exp.Router();

//category insert operation
  router.post('/CatInsert', (req, resp)=>{
          conn.tbl_category.save(req.body, (err, result)=>{
             if(err){
               resp.send(err);
             }
             resp.send(result);

          })
  })

 //category getdata opertaion
router.get('/CatGet', (req, resp)=>{
  conn.tbl_category.find().toArray(function(err, result){
     if(err){
       resp.send(err);
     }
     resp.send(result); 
  })
})




//category update operation
router.post("/CatUpdate",(req,res)=>{
rowid=req.body[0]._id.toString()
conn.tbl_category.update({_id:ObjId(rowid)},{$set:req.body[1]},(err,result)=>{
  if(err)
  res.send({resp:err})
  else
  res.send({resp:"Category Updated"})
})

})


module.exports = router;
