const express = require('express');
const cors = require('cors');
const scrape = require('./scrape/scrape.js'); // Import the scrape function
const app = express();
const port = 8000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'] // Allow these headers
}));
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { address } = req.body;
  try {
    const numPantries = await scrape(address);
    res.status(200).json({ numPantries }); // Send response as JSON
  } catch (error) {
    res.status(500).send('Error occurred during scraping');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});