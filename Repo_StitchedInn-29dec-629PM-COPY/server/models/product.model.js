import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    // default:'Shalwaar Qameez',
    // enum: ['Shalwaar Qameez' , 'Shirwaani','Lehnga','Saarree','Mens Kurta','Ladies Kurta','Ladies Shalwaar Qameez'],    
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Capacity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'}
})

export default mongoose.model('Product', ProductSchema)
