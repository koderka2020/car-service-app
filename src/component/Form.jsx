import React from 'react';

const Form = () => {
  return (
    <div style={{padding: 30 }}>
      <h2>Form</h2>
      <form action="/table" method="POST" class="my-4 form-inline">
      
      <label for="name" class="name">Name</label>
      <input  required placeholder='Joe Smith' type="text" name="name" id="name" class="form-control"/>
      
      <label for="email" class="email">Email address</label>
      <input  required placeholder='joe@gmail.com' type="email" name="email" id="email" class="form-control"/>
      
      <label for="date" class="date">Date</label>
      <input  required placeholder='Date' type="date" name="date" id="date" class="form-control"/>
      
      <button class="btn btn-success" type="submit" style={{margin: 30 }}>Schedule now</button>
    </form>
    </div>
  );
};


export default Form;