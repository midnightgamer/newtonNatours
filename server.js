const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const port = process.env.PORT;
const app = require('./app');

app.listen(port, () => {
   console.log(`Server listening on http://localhost:${port}`);
});
