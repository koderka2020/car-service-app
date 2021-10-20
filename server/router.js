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
  controller.deleteClientRecord,
  (req, res) => res.status(200).json(res.locals.client)
);

//DELETE SELECTED CLIENT ROUTE HANDLER
router.delete('/:id',
  controller.deleteClientRecord,
  (req, res) => res.status(200).json(res.locals)
  );


module.exports = router;