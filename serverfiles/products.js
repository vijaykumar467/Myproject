var exp = require('express');
var router = exp.Router();

router.post('/ProductInsert', (req, resp)=>{
    var obj = {
                 ProductName: req.body.ProductName,
                 Cat_Id: ObjId(req.body.Cat_Id),
                 Subcat_Id: ObjId(req.body.Subcat_Id),
                 Subsubcat_Id: ObjId(req.body.Subsubcat_Id),
                 Brand_Id: ObjId(req.body.Brand_Id),
                 Color: req.body.Color,
                 OldPrice: req.body.OldPrice,
                 NewPrice: req.body.NewPrice,
                 Quantity: req.body.Quantity,
                 ItemDescryption: req.body.ItemDescryption,
                 ItemRating : req.body.ItemRating,
                 Offers: req.body.Offers,
                 ProductType: req.body.ProductType,
                 //UploadFile: req.body.UploadFile,
                 Size: req.body.Size,
                 Status: req.body.Status
              }
      conn.tbl_products.save(obj, (err, result)=>{
         if(err){
             resp.send({resp: "Product Not Insert"});
         }
         else{
           resp.send({resp: "Product Inserted"});
         }
      })
})


//data getting
router.get('/ProductGet', (req, resp)=>{
    conn.tbl_products.aggregate([
        {
          $lookup: {
             from: "tbl_subsubcategory",
             localField: "Subsubcat_Id",
             foreignField: "_id",
             as: "subsubcatdata"
          }
        },
          {"$unwind": "$subsubcatdata"},
        {
          $lookup: {
             from: "tbl_subcategory",
             localField: "Subcat_Id",
             foreignField: "_id",
             as: "subcatdata"
          }
        },
          {"$unwind": "$subcatdata"},
        {
          $lookup: {
              from: "tbl_category",
              localField: "Cat_Id",
              foreignField: "_id",
              as: "catdata"
          }
        },
          {"$unwind": "$catdata"},
        {
          $lookup: {
             from: "tbl_brand",
             localField: "Brand_Id",
             foreignField: "_id",
             as: "brandData"
          }
        },
          {"$unwind": "$brandData"},

        {
          "$group": {
             "_id": "$_id",
             "items": {
               "$push": {
                  "_id": "$_id",
                  "ProductName": "$ProductName",
                  "CategoryName": "$catdata.CategoryName",
                  "SubcategoryName": "$subcatdata.SubcategoryName",
                  "SubsubcategoryName": "$subsubcatdata.SubsubcategoryName",
                  "BrandName": "$brandData.BrandName",
                  "Color": "$Color",
                  "OldPrice": "$OldPrice",
                  "NewPrice": "$NewPrice",
                  "Quantity": "$Quantity",
                  "ItemDescryption": "$ItemDescryption",
                  "ItemRating": "$ItemRating",
                  "Offers": "$Offers",
                  "ProductType": "$ProductType",
                  "Size": "$Size",
                  "Status": "$Status"
               }
             }
          }
        },
          {"$unwind": "$items"}
    ], (err, result)=>{
        if(err)
         resp.send(err);
        else
         resp.send(result);
    })
})

//Porducts getting into user module

router.post("/GetProductsBasedId", (req, resp)=>{
  SubsubCatId = ObjId(req.body.ssid);

 // console.log(req.body)
  if(req.body.min){
    //console.log("hello")

    var minval=req.body.min
    var maxval=req.body.max
    conn.tbl_products.find({Subsubcat_Id: SubsubCatId,NewPrice:{$gte:minval,$lte:maxval}}, (err, result)=>{
     // console.log(err)
     // console.log(result)
      resp.send(result);
  })
  }
  else
  {
    conn.tbl_products.find({Subsubcat_Id: SubsubCatId}, (err, result)=>{
     // console.log(result)
      resp.send(result);
    })
  }
})

//product details getting into user module
router.post('/GetProductDetailById', (req, resp)=>{
    Product_id= ObjId(req.body._id) ;
    conn.tbl_products.find(Product_id, (err, result)=>{
         resp.send(result);
    })
})

//upcoming products getting into user multi slider code

router.get('/GetUpcomingProducts', (req, resp)=>{

    conn.tbl_products.find({ProductType: "New Collection"}).sort({ProductType: 1}).limit(12 , (err, result)=>{
        resp.send(result);
    })
})

//oldproducts data getting into user mutlti slider code
router.get('/GetOldProdutcs', (req, resp)=>{
   conn.tbl_products.find({ProductType: "Old Collection"}).sort({ProductType: 1}).limit(12, (err, result)=>{
      resp.send(result);
   })
})

//getting products based on category names
router.post('/GetProductsBasedOnCategory', (req, resp)=>{
  CID = ObjId(req.body.cat_id)
  //console.log(CID)
  conn.tbl_products.find({Cat_Id: CID}, (err, result)=>{
      resp.send(result);
     })
})


//adding more colors to products
router.post('/AddMoreColors', (req, resp)=>{
   conn.tbl_color.save(req.body, (err, result)=>{
       if(err)
        resp.send(err);
       else
        resp.send(result);
        console.log(result)
   })
})

//getting the color code based on two tables
router.get('/GetColorCode', (req, resp)=>{
   conn.tbl_color.find().toArray((err, result)=>{
       if(err)
        resp.send(result);
       else
        resp.send(result);
   })
})

//insert the product with color and color image
router.post('/InsertProductWithColorImg', (req, resp)=>{
   var obj = {
      Product_Id: req.body.Product_Id,
      Color_Id: req.body.Color_Id
   }
    conn.tbl_color_image.save(obj, (err, result)=>{
        if(err)
         resp.send(err);
        else
         resp.send(result);
    })
})

module.exports = router;
