import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
const initServer = ()=>{
    dotenv.config();
    
    const app = express();
    const PORT = process.env.PORT || 3000;
    
    // Middleware
    app.use(express.json());
    
    // Basic route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });

}
export default initServer;
