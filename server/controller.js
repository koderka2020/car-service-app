
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
      // console.log(`result of Client.create is' + ${result}`);
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
controller.deleteAppointments = (req, res, next) => {
  const { ids } = req.body;
  // console.log(ids);
  Client.deleteMany({ _id: { $in: ids }})
    .then(response => {
      if (!response){
        return res.status(400).json({message:'no valid entry found for provided IDs'});
      }else{
        res.locals.deleted = response;
        return next();
      }
    })
    .catch(err => next({
      error: `error occured in controller.deleteClientRecord: ${err} `
    }));
};

controller.deleteAll = (req, res, next) => {
  Client.deleteMany({})
    .then(result => {
      console.log('deleting of all data finished');
      return next();
    })
    .catch(err => next({
      error: `error occured in controller.deleteAll: ${err} `
    }))
}

// controller.deleteSleceted = (re,res, next) => {
//   const {} = req.body // get all selected clients from the req.body
//   Client.deleteMany({userUID: uid, id: { $in: [10, 2, 3, 5]}})
// }

module.exports = controller;