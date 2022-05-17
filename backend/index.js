import restify from 'restify';
import connectDB from './dbconfig/connect'

const server = restify.createServer;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(8080, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  } 
}

export default start;