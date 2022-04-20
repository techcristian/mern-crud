import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {usePosts} from '../context/postContext'
import {useNavigate,useParams,Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'





function PostForm() {
    const {createPost,getPost,updatePost}= usePosts()
    const navigate=useNavigate()
    const params=useParams()
    console.log(params)
   
    const[post,setPost]=useState({
        title:'',
        description:'',
        image: null,
       
    })
    
    useEffect(()=>{
        (async() =>{ 
            if(params.id){
            const post = await getPost(params.id)
             setPost(post)
            }
        })()
       
        },[params.id])

  
    return(
      
   <div className='flex items-center justify-center '>
      

      <div className='bg-zinc-800 p-10 shadow-md shadow-black cards '>
      <div className='spinner-goback'></div>
        <header className='flex justify-between items-center py-4'>
        <div className='text-white text-2xl'>Upload-Image </div>
        
        <Link to='/' className='button-go '>go back</Link>
        
       
        </header>
        
             <Formik
            //inicializacion de variables
            initialValues={post}
            //validacion de los campos con yup y devuelve el menjase de error con ErrorMessage en el Form.
            validationSchema={Yup.object({
                title: Yup.string().required('title is required'),
                description:Yup.string().required('description is required')
            })}
            //onSubmit propiedad que ejecuta los valores de los campos en el componente createPost que hace la peticion (Post) y redirecciona con navigate a HomePage.
            onSubmit={async (values,actions)=>{
                console.log(values)
                if(params.id){
                    await updatePost(params.id,values)
                }else
                await createPost(values)
                actions.setSubmitting(false)
                navigate('/')

             }}
             enableReinitialize={true}
            >
              {({handleSubmit,setFieldValue,isSubmitting})=> (
                <Form onSubmit={handleSubmit}>
                    <label htmlFor='title' className='text-sm block font-bold text-gray-400'>Title</label>
                    <Field name='title' placeholder='title'
                     className='px-3 py-2 focus:outline-none rounded bg-gray-600 hover:bg-gray-500 text-white shadow-md shadow-black w-full mb-3'/>
                    <ErrorMessage component='p' className='text-red-600 text-sm' name='title'/>
                    
                   
                   <label htmlFor='description' className='text-sm block font-bold text-gray-400'>Description</label>
                    
                    <Field component="textarea" name='description'  placeholder='description' 
                    className='px-3 py-2 focus:outline-none rounded text-white bg-gray-600 hover:bg-gray-500 shadow-md shadow-black w-full mb-3'
                    rows={3}/>
                    <ErrorMessage name='description'component='p' className='text-red-600 text-sm'/>

                    <label htmlFor='image' className='text-sm block font-bold text-gray-400'>Image</label>
                    <input type='file' name='image'className='px3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                     onChange={(e)=>setFieldValue('image',e.target.files[0])}
                    />
                    
                    <button type='submit'className=' button-save'
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                        <AiOutlineLoading3Quarters className="animate-spin h-4 w-4"/>
               ) : 'Save'}
                    </button>
              
                
             </Form>
               )}
                
            </Formik>
          
        </div>
        

        </div>
        
        )
    
}

export default PostForm;
//bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded mt-2 focus:outline-none px-4 py-2 