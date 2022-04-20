import mongoose from 'mongoose'

const postSchema=new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    image:{
      url:String,
      public_id:String

    }
})

export default mongoose.model('Post',postSchema)