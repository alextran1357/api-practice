const express = require('express')
const pool = require('./db')

const app = express();
const PORT = 5000;

app.use(express.json())

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`App has started on https://localhost:${PORT}`)
  } else {
    console.log("Error occurred, server can't start", error)
  }
})

app.post('/add_product', async (req, res) => {
  const { name, cost, quantity } = req.body
  if (!name || !cost || !quantity) {
    res.status(400).json({ error: "All fields must be filled in." })
  }
  
  try {
    const result = await pool.query('INSERT INTO shopping_cart (name, cost, quantity) VALUES ($1, $2, $3) RETURNING *', 
      [name, cost, quantity]
    )
    res.status(200).json({message: result.rows[0]})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "There was an error inserting into shopping cart" })
  }

})

app.get('/get_shopping_cart', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from shopping_cart')
    res.status(200).json({ message: result.rows[0]})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "There was an error grabbing shopping cart: ", error})
  }
})

app.post('/remove_product', async (req, res) => {
  const { id } = req.body
  
  if (!id) {
    res.status(400).json({ error: "All fields must be filled in." })
  }

  try {
    const result = await pool.query('DELETE FROM shopping_cart WHERE id = $1',
      [id]
    )
    res.sendStatus(200)
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "There was an error removing database row" })
  }
})

app.get('/get_contacts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.first_name, c.last_name, c.email 
      FROM CONTACT c 
      WHERE activity=DATE '2022-10-1' 
      ORDER BY c.last_name ASC`)
    res.status(200).json({ message: result.rows})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: "Error getting contacts"})
  }
})