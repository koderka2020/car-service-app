const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', 
  controller.readAllRecords,
  (req,res) => res.status(200).json({records: res.locals.records})
  );

router.post();

router.delete();

router.patch();


module.exports = router;