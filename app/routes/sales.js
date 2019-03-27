

const app = module.exports = require('express')();

app.get('/sales', db.getSales)
app.get('/sales/:id', db.getSaleById)
app.post('/sales', db.createSale)
app.put('/sales/:id', db.updateSale)
app.delete('/sales/:id', db.deleteSale)