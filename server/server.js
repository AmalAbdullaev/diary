const express = require('express');
const makeCrud = require('express-json-file-crud').makeCrud;
const diaryCrud = makeCrud('diary', '.');
const categoriesCrud = makeCrud('categories', '.');
const app = express();
const cors = require('cors');

app.use(cors());
app.use('/diary', diaryCrud);
app.use('/categories', categoriesCrud);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});