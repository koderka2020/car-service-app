
// const { response } = require('express');
// const mongoose = require('mongoose');
const Client = require('./model');

const controller = {};


controller.newClientRecord = (req, res, next) => {
  // console.log('testing post method to create a new client')
  const clientObj = {
    name: req.body.name,
    email: req.body.email,
    active: true,
  }
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

controller.readAllRecords = (req, res, next) => {
  Client.find({})
    .then(response => {
      // console.log(`result of Client.find({}) is' + ${response[0]}`);
      res.locals.records = response;
      return next();
    })
    .catch(err => next({
      message: `Error creating new client  in controller.readAllrecords  because of :${err}`
    }))
};


controller.updateClientRecord = (req, res, next) => {
  const { id } = req.body;
  const { date }  = req.body;
  Client.findOneAndUpdate({_id: id}, {date: date})
    .then(response => {
      console.log(`testing - updated record is ${response}`);
      if (response) {
      res.locals.client = response;
      return next();
      } else {
        return res.status(404).json({message:'no valid entry found for provided ID'})
      }
    })
    .catch(err => next({
      error: `error occured in controller.updateClientRecord: ${err} `
    }))
};

controller.deleteClientRecord = (req, res, next) => {
  conosle.log('delete controller firing')
  const { id } = req.params;
  console.log(id);
  Client.findOneAndDeleteOne({_id: id})
    .then(() => {
      console.log(`deleted record`);
      // if (response) {
      //   res.locals.deleted = response;
        return next()})
    .catch(err => next({
        error: `error occured in controller.deleteClientRecord: ${err} `
    }))
};



module.exports = controller;