import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.route.js'
import connectDB from './config/db.config.js';
import cookieParser from 'cookie-parser';
// Load environment variables
const initServer = ()=>{
    dotenv.config();
    connectDB();
    const app = express();
    const PORT = process.env.PORT || 3000;
    
    // Middleware
    app.use(express.json());
    app.use(cookieParser());
    // Basic route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.use('/auth' , userRoutes);
    app.use('/post' , postRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });

}
export default initServer;
