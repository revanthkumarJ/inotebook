const mongoose=require("mongoose")
const { Schema } = mongoose;

const notesSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
 title:{
    type:String,
    required:true,
 },
 description:{
    type:String,
    required:true,
 },
 tag:{
    type:String,
    default:"general"
 },
 tmp:{
    type:Date,
    default:Date.now
 }
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports=Notes