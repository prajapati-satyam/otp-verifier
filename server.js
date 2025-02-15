const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const send_mail = require('./routes/send_mail_router');
const cors = require('cors')


app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
}) 

app.get('/gpt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gpt.html'))
})

app.use('/mail', send_mail)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})