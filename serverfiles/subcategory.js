var exp = require('express');
var router = exp.Router();

//subcategory insert
router.post('/subcatInsert', (req, resp)=>{
  obj={
    SubcategoryName : req.body.SubcategoryName,
      Cat_Id : ObjId(req.body.Cat_Id),
      Status : req.body.Status
}

console.log(obj)
    conn.tbl_subcategory.insert(obj, (err, result) => {
        if (err)
            resp.send("db connection error")
        else {
            if (result.length == 0) {
                resp.send({ resp: 0 });
            }
            else {
                resp.send({ resp: 1 });
            }
        }
    })
})


//subcategory get data
router.get('/SubcatGet', (req, resp)=>{
  conn.tbl_subcategory.aggregate([
    {
    "$lookup":{
    from:"tbl_category",
    localField:"Cat_Id",
    foreignField:"_id",
    as:"CatData"
    }
    },
    {"$unwind":"$CatData"},
   /* {
      "$group": {
        "_id": "$_id",
        "items": {
          "$push": {
             "SubcategoryName": "$SubcategoryName",
             "CategoryName": "$CatData.CategoryName",  
             "Status": "$Status"
          }
        }
      }
    },
     {"$unwind": "$items"} */
    ], (err,result)=>{
        if(err)
        resp.send(err);
        else
        resp.send(result);
    })
  })


//subcategory update operation

router.post("/SubcatUpdate",(req,resp)=>{
  rowId=req.body[0]._id.toString()
  console.log(req.body[1])
  obj={
    SubcategoryName:req.body[1].SubcategoryName,
    Cat_Id:ObjId(req.body[1].Cat_Id),
    Status: req.body[1].Status
  }
  conn.tbl_subcategory.update({_id:ObjId(rowId)},{$set:obj},(err,result)=>{
    if(err)
    resp.send({resp:"Not Updated"})
    else
    resp.send({resp:"Subcategory Item Updated"})
     })

  })


module.exports = router;

