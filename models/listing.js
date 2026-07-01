

 const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review= require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url: String,
   filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
geometry: {
   type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
},
category:{
  type: String,
  enum: ["Trending","Rooms","Icon cities","Mountains","Castles","Amazing pools","Camping","Farms","Arctic","Domes","Boats"],
},
  
});
listingSchema.post("findOneAndDelte",async()=>{
  if(listing) {
    await Review.deleteMany({_id: {$in: listingSchema.reviews}});
  }

});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;