const mongoose = require('mongoose')
const signup = new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String}
}
    ,{
        timestamps:{
            createdAt :"created_at",
             
            updatedAt :"updated"
             
             }

});
const data = new mongoose.Schema({
    email:{type:String},
    description:{type:String},
    phone:{type:Number}
})
const mb = new mongoose.Schema({
    shop: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    password_test: { type: String },
    firstName: { type: Object },
    lastName: { type: Object },
    phone: {type:Number},
    customer_accesstoken: {type:String},
    expireAt: {type:String},
    acceptsMarketing: { type: Boolean },
    customer_id:{type:String},
    cart_id:{type:String}
  },
  { timestamps: true })
let builderData =  new mongoose.Schema( { shop: { type: String, required: true }, publish: { type: Boolean }, template_name:{type:String}, design_name: { type: String }, template_id: { type: String }, profile_page_design: { type: Object }, cart_page_design: { type: Object }, product_detail_page_design: { type: Object }, product_list_page_layout : { type: String}, collection_list_page_layout : { type: String}, landing_page: { type: Array }, bottom_bar: { type: Object }, app_apperance: { type: Object }, top_bar: { type: Object }, side_bar: { type: Object }, }, { timestamps: true } );
const signupTable = mongoose.model("signup",signup);
const akshay = mongoose.model('builderData',builderData);
const dataInsert = mongoose.model("data",data);
const mobileBuilder = mongoose.model("customerlist", mb)
module.exports = {signupTable,dataInsert,akshay,mobileBuilder};