
const { response } = require('express');
const db = require('model');

const controller = {};


controller.newClientRecord = (req, res, next) => {
  const clientObj = {
    name: req.body.name,
    email: req.body.email,
    appointment: req.body.date,
    active: true,
  }
  db.create(clientObj)
    .then(result => {
      console.log(`result of db.create is' + ${result}`);
      res.locals.client = result;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client  in controller.newClientRecord  because of :${err}`
    }));
};

controller.readAllRecords = (req, res, next) => {
        db.find({})
          .then(response => {
            res.locals.records = response;
            next();
          })
          .catch(err => next({
            message: `Error creating new client  in controller.readAllrecords  because of :${err}`
          }))
};


controller.updateClientRecord = (req, res, next) => {

};

controller.deleteClientRecord = (req, res, next) => {

};



module.exports = controller;