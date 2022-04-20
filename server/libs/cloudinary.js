import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name:'deh3ogrvh',
  api_key:'171961432622379',
  api_secret:'JER4L7ovqOLWQahjjDyDTpTCvOQ'
})


//funcion que exporta subir imagen a cloudinary
export const uploadImage= async filePath => {
  return await cloudinary.uploader.upload(filePath,{
    folder : 'posts'
  })
}

//funcion que borra imagen de cloudinary

export const deleteImage = async (id) =>{
  return await cloudinary.uploader.destroy(id)
}

