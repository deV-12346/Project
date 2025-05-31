const MyWishListModel = require("../../Models/MyWishList.Model")
const FetchMyWishList = async(req,res,next)=>{
      try{
      const userId = req.user?.id;
      console.log("userid",userId)
      const Product = await MyWishListModel.find({ user: userId }).populate('product');
      if(Product.length===0){
            return res.status(400).json({
                  success:false,
                  message:"Product Not Found"
            })
      }
      return res.status(200).json({
            success:true,
            message:"Product Fetached Succcessfully",
            product:Product
      })
}
      catch(err){
            next(err)
      }
}
module.exports = {FetchMyWishList}