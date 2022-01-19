const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'htpp://localhost:8081',
}

// parse requests of content-type - application/json
app.use(express.json())

// parse request of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder applications' })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
