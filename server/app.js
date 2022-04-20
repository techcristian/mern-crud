import express from 'express'
import fileUpload from 'express-fileupload'
import postsRoutes from './routes/posts.routes.js'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'

const app = express()
const __dirname= dirname(fileURLToPath(import.meta.url))

//middlewares se ejeucutan antes de cargar las rutas
app.use(express.json())
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: './upload'

}))


//routes
app.use(postsRoutes)
console.log(__dirname)
//unimos el backend con el frontend(__dirname como backend y ../cliente/build como frontend)
app.use(express.static(join(__dirname,'../cliente/build')))

//cuando se haga cualquier tipo de peticion desde el navegador lo manejara el backend con app.get y devolvera index.html donde se encuentran todas las rutas del frontend
app.get('*', (req,res) =>{
  res.sendFile(join(__dirname,'../cliente/build/index.html'))
})





export default app