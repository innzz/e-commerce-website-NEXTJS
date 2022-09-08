import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async(req,res)=>{
  console.log(req.body)
  //update status into orders table after checking the transaction status
  // let order = await Order.findOne({orderId : req.body.orderId});
  let order = await Order.findByIdAndUpdate({orderId: req.body.orderId}, {status: "Paid"});

  //initiate shipping
  //redirect user to the order confirmation page
    res.status(200).json({ body: order })
 }

export default connectDb(handler);