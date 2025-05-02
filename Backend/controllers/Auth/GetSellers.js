const Seller = require("../../Models/seller.model")

const  GetallSellers = async (req,res) =>{
      try{
          const sellers = await Seller.find()
          res.status(200).json(sellers)
      }
      catch(error){
         res.status(400).json({message:"Error fetching data"})
      }
}
module.exports={GetallSellers}