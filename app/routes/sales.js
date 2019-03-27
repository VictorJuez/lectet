const app = module.exports = require('express')();
const db = require('../actions').sales;

app.get('/', db.getSales)
app.get('/:id', db.getSaleById)
app.post('/', db.createSale)
app.put('/:id', db.updateSale)
app.delete('/:id', db.deleteSale)