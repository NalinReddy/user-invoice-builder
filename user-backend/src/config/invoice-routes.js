import express from 'express';
import invoiceController from '../api/controllers/invoice.controller';
export const invoiceRouter = express.Router();

//invoices
// invoiceRouter.use('/', invoiceController.verify)
invoiceRouter.get('/invoices', invoiceController.findAll)
invoiceRouter.get('/invoice/:id', invoiceController.findOne)
invoiceRouter.delete('/invoice/:id',invoiceController.delete)
invoiceRouter.put('/invoice/:id',invoiceController.update)
invoiceRouter.post('/invoices', invoiceController.create)
