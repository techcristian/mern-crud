//axios nos permite hacer peticiones Get,Post,Delete,Put .. al back-end desde el fron-end
import axios from 'axios'

//usamos proxy que nos da npm como "servidor"para guardar en el package.json del front-end la direccion http a la cual nos vamos a conectar para obtener y enviara datos y solo ponemos el nombre de la ruta del back-end.MONGODB_URI

//ruta que viene del backend para listar los posts
export const getPostsRequest= async () => await axios.get('/posts')

//ruta que se envia al backend para guaradar un post desde el formulario
export const createPostRequest = async (post) => {
  const form = new FormData()
  for (let key in post){
    form.append(key, post[key])
  }
  
  return await axios.post('/posts',form,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
   });
}




//ruta que viene del backend con (id) para elelinar post
export const deletePostRequest =async (id) => await axios.delete('/posts/'+id)

//ruta que viene desde el backend y trae id para actualizar un post
export const getPostRequest =async (id) => await axios.get('/posts/'+id)

//ruta para actualizar
export const updatePostRequest = async (id,newFields) => await axios.put(`/posts/${id}`,newFields)
