import * as dotenv from 'dotenv';
dotenv.config()


import app from './server'

app.listen(3001, (req, res) => {
  console.log("listening on port 3001");
});
