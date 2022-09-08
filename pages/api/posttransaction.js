import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async(req,res)=>{
  console.log(req.body)
  //update status into orders table after checking the transaction status
  let order = await Order.findOneAndUpdate({orderId : req.body.orderId},{status: "Paid"});

  //initiate shipping
  //redirect user to the order confirmation page
    res.status(200).json({ status: "success" })
 }

export default connectDb(handler);