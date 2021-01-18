import {Order, CartItem} from '../models/order.model'
import errorHandler from './../helpers/dbErrorHandler'
import Shop from '../models/shop.model'

const create = async (req, res) => {
  try {
    req.body.order.user = req.profile
    let order = new Order(req.body.order)
    let result = await order.save()
    res.status(200).json(result)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByShop = async (req, res) => {
  try {
    let orders = await Order.find({"products.shop": req.shop._id})
      .populate({path: 'products.product', select: '_id name price'})
      .sort('-created')
      .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let order = await Order.updateOne({'products._id':req.body.cartItemId}, {
        'products.$.status': req.body.status
    })
      res.json(order)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const updateFabricStatus = async (req, res) => {
  try {
    let order = await Order.updateOne({'products._id':req.body.cartItemId}, {
        'products.$.fabricreceivedstatus': req.body.fabricreceivedstatus
    })
      res.json(order)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const updateRating = async (req, res) => {
  try {
    console.log(req.body)
    let order = await Order.updateOne({'products._id':req.body.cartItemId}, {
        'products.$.rating': req.body.rating
    })

    let shop = await Shop.findOne({
      '_id': req.body.shopId
    })
    let rating=-1;
    if(shop.rating == -1)
    {
      await Shop.updateOne({'_id': req.body.shopId}, {
        'rating': req.body.rating
         })
      //rating = req.body.rating
    }
    else{
      await Shop.updateOne({'_id': req.body.shopId}, {
        'rating': (shop.rating+req.body.rating)/2
         })
      //rating = (shop.rating+req.body.rating)/2
    }

    
    console.log(shop)
      res.json(order)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const getStatusValues = (req, res) => {
  res.json(CartItem.schema.path('status').enumValues)
}

const getFabricStatusValues = (req, res) => {
  res.json(CartItem.schema.path('fabricreceivedstatus').enumValues)
}

const getRating = (req, res) => {
  res.json(CartItem.schema.path('rating').enumValues)
}

const orderByID = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id).populate('products.product', 'name price').populate('products.shop', 'name').exec()
    if (!order)
      return res.status('400').json({
        error: "Order not found"
      })
    req.order = order
    next()
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let orders = await Order.find({ "user": req.profile._id })
        .sort('-created')
        .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = (req, res) => {
  return res.json(req.order)
}

const todayOrders =async  (req, res) => {
  //res.json(CartItem.schema.path('status').enumValues)

  try {
    let orders = await Order.find({ 
      "created" : { 
        $lt: new Date(), 
        $gte: new Date(new Date().setDate(new Date().getDate()-1))
      }   
    }).populate('products.product', 'name price')
      .sort('-created')
      .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  listByShop,
  update,
  updateFabricStatus,
  updateRating,
  getStatusValues,
  getFabricStatusValues,
  getRating,
  orderByID,
  listByUser,
  read,
  todayOrders
}
