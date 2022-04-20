import Post from '../models/Post.js'
import {Router} from 'express'
import {uploadImage,deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

const router= Router()



//consulta metodo get (trae todos los posts de la base de datos)
router.get('/posts',async(req,res)=> { 
  try {
    const posts=await Post.find()
    res.send(posts)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
 
})

//consulta metodo post(crear post)
router.post('/posts',async (req,res)=> {
  try {
     const {title,description}=req.body
      let image;
    if(!req.files){
      const newPost=new Post({title,description,image})
      console.log(newPost)
      await newPost.save()
      return res.json(newPost)
    }
      if(req.files.image){
      const result=await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      image={
        url: result.secure_url,
        public_id: result.public_id
      } 
      const newPost=new Post({title,description,image})
      console.log(newPost)
      await newPost.save()
      return res.json(newPost)
      }
   
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
  
})

//consulta put(actualizar)
router.put('/posts/:id',async(req,res)=>{
  try {
    console.log(req.params)
    console.log(req.body)
    const updatePost =await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updatePost)
    return res.send(updatePost)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
 

})

//peticion delete (borra un post de la base de datos)
router.delete('/posts/:id',async (req,res)=> {
try {
  const postRemoved= await Post.findByIdAndDelete(req.params.id)
 if(!postRemoved) return res.sendStatus(404)

 if(postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id)
  }
  return res.sendStatus(204)
} catch (error) {
  return res.status(500).json({message:error.message})
}
 
}
)
//peticion get(busca y trae un solo dato de la base de datos por medio de un id)
router.get('/posts/:id',async(req,res)=> {
  try {
    const postOnly=await Post.findById(req.params.id)
   if (!postOnly) return res.sendStatus(404)
    return res.json(postOnly)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
  
  })

  
  
  

 

export default router