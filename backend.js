const express = require('express');
const cors = require('cors');
const {getPantryUrls, scrapePantryDetails} = require('./scrape/scrape.js'); // Import the getPantryUrls function
const app = express();
const port = 8000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'] // Allow these headers
}));
app.use(express.json());

app.post('/urls', async (req, res) => {
  const { address } = req.body;
  try {
    const urls = await getPantryUrls(address);
    // console.log(urls)
    res.status(200).json(urls); // Send response as JSON
  } catch (error) {
    res.status(500).send('Error occurred during scraping');
  }
});

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const pantryDetails = await scrapePantryDetails(url);
    // console.log(pantryDetails)
    res.status(200).json(pantryDetails); // Send response as JSON
  } catch (error) {
    res.status(500).send('Error occurred during scraping');
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});