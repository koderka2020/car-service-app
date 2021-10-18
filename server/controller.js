
// const { response } = require('express');
// const mongoose = require('mongoose');
const Client = require('./model');

const controller = {};


controller.newClientRecord = (req, res, next) => {
  console.log('testing post method to create a new client')
  const clientObj = {
    name: req.body.name,
    email: req.body.email,
    // appointment: req.body.date,
    active: true,
  }
  Client.create(clientObj)
    .then(result => {
      console.log(`result of Client.create is' + ${result}`);
      res.locals.client = result;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client  in controller.newClientRecord  because of :${err}`
    }));
};

controller.readAllRecords = (req, res, next) => {
  console.log('reading records')
  Client.find({})
    .then(response => {
      console.log(`result of Client.find({}) is' + ${response[0]}`);
      res.locals.records = response;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client  in controller.readAllrecords  because of :${err}`
    }))
};


controller.updateClientRecord = (req, res, next) => {
  // const { _id } = req.body;
  // const { date } = req.body;
  // Client.findOneAndUpdate({_id: _id}, {date: date})
  //   .then(response => {
  //     console.log(`updated record is ${response}`);
  //     res.locals.client = response;
  //     return next();
  //   })
  //   .catch(err => next({
  //     error: `error occured in controller.updateClientRecord: ${err} `
  //   }))
};

controller.deleteClientRecord = (req, res, next) => {
  // const { _id } = req.body;
  // Client.deleteMany({active: false})
  //   .then(response => {
  //     console.log(`deleted record: ${response}`)
  //   }).catch(err => next({
  //       error: `error occured in controller.deleteClientRecord: ${err} `
  //   }))
};



module.exports = controller;