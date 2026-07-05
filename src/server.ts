import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { PORT } from './config/env.js';

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(error =>{ 
  console.log('[Server]: Failed to start', error);
  process.exit(1)
})