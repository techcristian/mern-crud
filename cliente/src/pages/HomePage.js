import {usePosts} from '../context/postContext'
import {Link} from 'react-router-dom'
import {PostCard} from '../components/PostCard'



function HomePage() {
     //solo utilizo los posts desde que vienen de (getPosts) y de la funcion (usePosts) que es exportada del postContext
     const {posts}= usePosts()
  
     
    
               const renderMain = () =>{
                    if(posts.length===0)
                    return (
                         <div className='flex flex-col justify-center items-center '>
                               
                               <h1 className='text-white text-4xl'>There are no posts </h1>
                         </div>
                          )
                    return <div className='cards'>
                    
                              {posts.map(post => (
                              <PostCard post={post} key={post._id}
                               />
                               ))}        
                          </div>

               }
           return ( 
        // recorremos el array posts,que llenamos con la funcion getPosts por cada propiedad
      
               <div >
                    <div >
                    <header className='flex justify-between py-4 font-bold '>
         
                    <h1 className='text-2xl text-gray-300'>Posts ({posts.length})</h1>
                     <Link to='/new' className='button-create'>
                     Create New Post
                     </Link>
                    </header>
            
                     {renderMain()}
                     </div>
         
              </div>

          
           
         )
          
    }
   
   
    export default HomePage