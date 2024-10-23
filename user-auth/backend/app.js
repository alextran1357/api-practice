const express = require('express')
const pool = require('./db')

const app = express()
app.use(express.json())
const PORT = 3000

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`App has started on https://localhost:${PORT}`)
  } else {
    console.log("Error occurred, server can't start", error)
  }
})
