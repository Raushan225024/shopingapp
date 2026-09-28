import express from 'express';
import routes from './src/routes/auth-routes.js';
const app = express();
app.use(express.json());
app.use('/auth',routes);
export default app;