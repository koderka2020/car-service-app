
// const { response } = require('express');
// const mongoose = require('mongoose');
const Client = require('./model');

const controller = {};

//adding new appoint to the DB
controller.newClientRecord = (req, res, next) => {
  // console.log('testing post method to create a new client')
  const clientObj = {
    name: req.body.name,
    email: req.body.email,
    active: true,
  };
  Client.create(clientObj)
    .then(result => {
      console.log(`result of Client.create is' + ${result}`);
      res.locals.client = result;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client in controller.newClientRecord  because of :${err}`
    }));
};

//gett all data from DB - to be rendered on the front-end
controller.readAllRecords = (req, res, next) => {
  Client.find({})
    .then(response => {
      // console.log(`result of Client.find({}) is' + ${response[0]}`);
      res.locals.records = response;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client  in controller.readAllrecords  because of :${err}`
    }));
};

//updating record
controller.updateClientRecord = (req, res, next) => {
  // console.log('update client middleware firing');
  // console.log(req.params);
  const { id } = req.params;
  const { appointment }  = req.body;
  Client.findByIdAndUpdate({_id: id}, {appointment: appointment}, {
    new: true
  })
    .then(response => {
      // console.log(`testing - updated record is ${response}`);
      if (response) {
        res.locals.client = response;
        return next();
      } else {
        return res.status(400).json({message:'no valid entry found for provided ID'});
      }
    })
    .catch(err => next({
      error: `error occured in controller.updateClientRecord: ${err} `
    }));
};

//deleting record
controller.deleteClientRecord = (req, res, next) => {
  // console.log('delete controller firing')
  const { id } = req.params;
  // console.log(id);
  Client.findOneAndRemove({_id: id})
    .then(response => {
      if (!response){
        return res.status(400).json({message:'no valid entry found for provided ID'});
      }else{
        res.locals.deleted = id;
        return next();
      }
    })
    .catch(err => next({
      error: `error occured in controller.deleteClientRecord: ${err} `
    }));
};



module.exports = controller;