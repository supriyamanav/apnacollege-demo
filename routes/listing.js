const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController= require("../controllers/listings");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync( listingController.index))
.post(isLoggedIn,

  upload.single("listing[image]"),
    validateListing,
  wrapAsync(
listingController.createListing
 
));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm );

router.get("/category/:category", async(req,res)=>{
 let {category} = req.params;

 const allListings = await
 Listing.find({
   category
 });

 res.render("listings/index",{
  allListings
 });
});

router.get("/search", async(req,res)=>{
  const{ q} = req.query;
  const allListings = await
  Listing.find({}, "title price location image");
  res.render("listings/index",{allListings});
});

router
.route("/:id")
.get(wrapAsync( listingController.showListing))
.put(isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
   wrapAsync(listingController.updateListing))
   .delete(isLoggedIn,isOwner,wrapAsync( listingController.destroyListing));






//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));




module.exports = router;