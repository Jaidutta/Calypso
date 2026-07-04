import {app} from './app.js';
import {PORT} from './config/env.js';

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 
}

startServer();