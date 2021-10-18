import React from 'react';

const Form = (props) => {


  return (
    <div style={{padding: 30 }}>
      <h2>Form</h2>
      <form onSubmit={props.handleCreation} action="/table" method="POST" className="my-4 form-inline">
      
      <label className="name">Name</label>
      <input  required placeholder='Joe Smith' type="text" name="name" id="name" className="form-control"/>
      
      <label className="email">Email address</label>
      <input  required placeholder='joe@gmail.com' type="email" name="email" id="email" className="form-control"/>
      
      <label className="date">Date</label>
      <input  required placeholder='Date' type="date" name="date" id="date" className="form-control"/>
      
      <button className="btn btn-success" type="submit" style={{margin: 30 }}>Schedule now</button>
    </form>
    </div>
  );
};


export default Form;