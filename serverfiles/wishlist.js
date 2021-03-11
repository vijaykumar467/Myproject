var exp = require('express')
var router = exp.Router();

//adding cart items into wish lista table code
router.post('/AddCartItemsToWhishList', (req, resp)=>{
  //console.log(req.body)
  var obj = {
      pid: ObjId(req.body.pid),
      uid: req.body.uid
  }
conn.tbl_wishlist.find(obj, (err, result)=>{
     if(result.length > 0){
         conn.tbl_wishlist.remove(obj)
     }
     else{
       conn.tbl_wishlist.save(obj)
     }
  })
resp.send({resp: 'hi'})
})

//getting the wish list data for checking the cart items
router.post('/GetWishListdata', (req, resp)=>{
  conn.tbl_wishlist.find(req.body, (err, result)=>{
      resp.send(result);
  })
})

//get the products based on wish list
router.get('/GetProductsBasedOnWishList', (req, resp)=>{
    conn.tbl_wishlist.aggregate([
      {
         $lookup: {
                      from: "tbl_products",
                      localField: "pid",
                      foreignField: "_id",
                      as: "data"
                  }
      },
      {"$unwind": "$data"},

    ], (err, result)=>{
        resp.send(result);
        console.log(result);
    })
})




module.exports = router;
