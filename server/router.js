const express = require('express');
const router = express.Router();
const controller = require('./controller');

//GET ALL CLIENTS ROUTE HANDLER
router.get('/', 
  controller.readAllRecords,
  (req,res) => res.status(200).json(res.locals.records)
  );

//ADD NEW CLIENT ROUTE HANDLER
router.post('/', 
  controller.newClientRecord,
  (req,res) => res.status(200).json(res.locals.client)
);

//UPDATE RECORD FOR SELECTED CLIENT ROUTE HANDLER
router.put('/:id',
  controller.updateClientRecord,
  (req, res) => res.status(200).json(res.locals.client)
);

//DELETE SELECTED CLIENT ROUTE HANDLER
router.delete('/',
  controller.deleteAppointments,
  (req, res) => res.status(200).json(res.locals.deleted)
);

//this endpoint doesn't take input from the front, only serves to clear the db from all data via postman after testing
//below should get deleted once I refactor code for a mock DB/injection DB for testing
// router.delete('/',
//   controller.deleteAll,
//   (req,res) => res.status(200).json({message: 'db has been emptied'}))


module.exports = router;