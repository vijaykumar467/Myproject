var exp = require('express');
var router = exp.Router();

router.post('/BrandInsert', (req, resp)=>{
   conn.tbl_brand.save(req.body, (err, result)=>{
      if(err){
        resp.send(err);
      }
      resp.send({resp:'Brand inserted'});
   })
})

//getting data

router.get('/Brandget', (req, resp)=>{
   conn.tbl_brand.find().toArray(function(err, result){
       if(err){
          resp.send(err);
       }
       resp.send(result);
   })
})

//update data
router.post('/BrandUpdate', (req, resp)=>{
    Id = req.body[0]._id.toString();
    conn.tbl_brand.update({_id: ObjId(Id)}, {$set: req.body[1]}, (err, result)=>{
        if(err){
          resp.send(err);
        }
        resp.send({resp: "Brand Update Success"})
    })
})


module.exports = router;
