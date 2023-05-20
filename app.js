const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const url = 'https://www.metal.com/Lithium-ion-Battery/202303240001';

app.use(cors());

app.get('/price', async (req, res) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const price = $('#__next > div > div.main___1ft3R.detail___2oeiJ > div.left___wCEQV > div:nth-child(3) > div.metalsContent___3T_m3 > div.priceContent___3lf_D > div > div:nth-child(1) > span.strong___1JlBD.priceDown___2TbRQ'
      )
      .text();

      res.json({ price });
    } else {
      res.status(response.status).json({ error: 'Failed to retrieve price' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});