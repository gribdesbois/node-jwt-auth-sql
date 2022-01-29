const express = require('express')
const cors = require('cors')

const app = express()
// parse requests of content-type - application/json
app.use(express.json())

app.use(cors())
app.options('*', cors())

// parse request of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
const authRoutes = require('./routes/auth.routes')

const Role = db.role

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder applications' })
})

// routes
/* require('./routes/auth.routes')(app); */
app.use('/api/auth',
  (req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  }, authRoutes)
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })

  Role.create({
    id: 2,
    name: 'moderator',
  })

  Role.create({
    id: 3,
    name: 'admin',
  })
}
/*
initial() function helps us to create 3 rows in database.
In development, you may need to drop existing tables and re-sync database.
So you can use force: true as code above.
For production, just insert these rows manually
and use sync() without parameters to avoid dropping data:
*/
