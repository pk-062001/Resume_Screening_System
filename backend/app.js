const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const rankRoutes = require('./routes/rankRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());



app.use('/rank', rankRoutes);

app.get("/", (req, res) => {
    res.send("Server is Working!!!............");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




