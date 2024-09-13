const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

const port = process.env.port | 5000 ;

const app = require('./app');


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

