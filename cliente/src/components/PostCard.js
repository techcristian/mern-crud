import toast from "react-hot-toast"
import {usePosts} from '../context/postContext'
import {useNavigate} from 'react-router-dom'




export function PostCard({post}) {

    const{deletePost}= usePosts()
    const navigate= useNavigate()

    
    //toast
    const handleDelete = (_id) => {
        toast((t) => (
            <div >
                <p className="text-red-600">Do you want to delete  <strong>{_id}</strong></p>
                <div className="flex justify-between px-20 py-5" >
              
                    <button className='button-delete'
                    onClick={()=>{
                        deletePost(post._id)
                        toast.dismiss(t._id)
                    }
                    }
                    >Delete</button>
                   
                    <button className="button-cancel "
                     onClick={()=> toast.dismiss(t.id)}>Cancel</button>
             
             </div>
             </div>
                    
                   ), {
            style:{
                background:"#202020"
            }
        }
        
        )
    }
    

//card    
return (
    <div >
    <div>
    <div className='bg-zinc-800 text-white rounded-sm 
        hover:bg-zinc-700 hover:cursor-pointer '>
        <div className='px-1 py-1 cards-home'>
           <div className="flex justify-between ">
           <h3>
              <div className="text-gray-400"><p>{post.title}</p> </div>
               <div className="text-gray-400"><p>{post.description} </p></div>
            </h3>
         
                 <button className="button-delete "
                         onClick={()=> handleDelete(post._id)}
            >
                Delete
            </button >
       
            <button className='button-up'   onClick={()=> navigate(`/posts/${post._id}`)}>
                     Update
             </button>
             
         </div>
         
               {post.image && <img src={post.image.url} alt="" className=" card-home" ></img>}
               </div>
            </div>
        </div>
    </div>
           
    )
}
