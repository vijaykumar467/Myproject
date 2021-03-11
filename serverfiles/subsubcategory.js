var exp = require('express');
var router = exp.Router();
//insert
router.post('/SubsubInsert', (req, resp)=>{
  obj={
    SubsubcategoryName : req.body.SubsubcategoryName,
      Subcat_Id : ObjId(req.body.Subcat_Id),
      Status : req.body.Status
    }
    console.log(obj)
    conn.tbl_subsubcategory.insert(obj, (err, result) => {
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





//get data
router.get('/SubsubGet', (req, resp)=>{
  conn.tbl_subsubcategory.aggregate([
    {
    "$lookup":{
    from:"tbl_subcategory",
    localField:"Subcat_Id",
    foreignField:"_id",
    as:"subcatdata"
    }
    },
    {"$unwind":"$subcatdata"},

    /*{
      "$group": {
        "_id": "$_id", 
        "items": {
          "$push": {
            "SubsubcategoryName": "$SubsubcategoryName",
            "SubcategoryName": "$subcatdata.SubcategoryName",
            "Status": "$Status"
          }
        }
      }
    },
    {"$unwind": "$items"} */
    ], (err,result)=>{
        if(err)
        resp.send(err)
        else
        resp.send(result)
    })
})

//update operation

router.post("/Subsubcat", (req, resp)=>{
       rowid = req.body[0]._id.toString()
       console.log(req.body[1])
      obj = {
             SubsubcategoryName : req.body[1].SubsubcategoryName,
             Subcat_Id : ObjId(req.body[1].Subcat_Id),
             Status: req.body[1].Status
         }

       conn.tbl_subsubcategory.update({ _id: ObjId(rowid) }, { $set: obj }, (err, result) => {
         if (err)
          resp.send({ resp: err })
        else
          resp.send({ resp: "Subsubcategory Updated" })
  })

})



module.exports = router;
