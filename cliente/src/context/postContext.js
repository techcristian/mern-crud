import { useState,createContext,useContext,useEffect } from "react"
import {getPostsRequest,createPostRequest, deletePostRequest, getPostRequest,updatePostRequest} from '../api/posts'



export const Postcontext = createContext()

export const usePosts = () =>{
const context = useContext(Postcontext)
return context
}

export const PostProvider =({children}) => {
  const[posts, setPosts]= useState([])
    console.log(posts)
   //funcion getPosts que permite cargar las publicaciones que vienen de backend
    const getPosts = async () => {
        const res = await getPostsRequest()
        //con setPost llenamos el array de Posts que se encuentran em el (res.data) de la consola de desarrolladores y llenamos todos los estados de los distintos componentes al usar (useState)
        setPosts(res.data) }
  
        //funcion createPost que permite crear un post desde el formulario 
    const createPost = async (post) =>{
        try {
            console.log(post)
        const res = await createPostRequest(post)
        console.log(res.data)
      
        setPosts([...posts,res.data])
        } catch (error) {
            console.log(error)
        }
        
        
    } 
    //funcion deletePost que borra un post
    const deletePost = async (id) =>{
        const res=await deletePostRequest(id)
      
        if (res.status === 204){
            setPosts(posts.filter((post)=>post._id !== id))
        }
    }
    //funcion getPost que permite traer datos desde el backend para llenar el formulario a actualizar
    const getPost =async (id) => {
        const res = await getPostRequest(id)
        console.log(res)
        return res.data
    }
  const updatePost= async (id,post) => {
    const res= await updatePostRequest(id,post)
    console.log(res)
    setPosts(posts.map((post) => (post._id === id ? res.data : post )))

  }
    
    // usamos el useEffect dentro de la funcion getPosts y este llena el array posts,y al ser exportada la funcion (usePosts)  utiliza (getPosts) y llena los demas componentes basicos(HomePage,etc)
    useEffect(()=>{
        getPosts()
   },[])
    return <Postcontext.Provider value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
        
       
     }}>
        {children}

    </Postcontext.Provider>
      
    }