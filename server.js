const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
   '<password>',
   process.env.DBPASSWORD
);
mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.info('DB Connected');
   });

const port = process.env.PORT;
app.listen(port, () => {
   console.log(
      `Server listening on http://localhost:${port}`
   );
});
