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
  (req,res) => res.status(200).json(req.body)
);

//DELETE SELECTED CLIENT ROUTE HANDLER
router.delete('/',
  controller.deleteClientRecord,
  (req, res) => res.status(200).json(res.locals.client)
  );

//UPDATE RECORD FOR SELECTED CLIENT ROUTE HANDLER
router.patch('/',
  controller.deleteClientRecord,
  (req, res) => res.status(200).json(res.locals.client)
);


module.exports = router;