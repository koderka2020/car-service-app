import React from 'react';
// import { useForm } from "react-hook-form";


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "test",
      email: "",
      appointment: '1.1.2022',
      active: true
        };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[name]: value})
  }

  render() {
  return (
    <div style={{padding: 30 }}>
      <h2>Form</h2>
      <form onSubmit={this.handleInput} action="/table" method="POST" className="my-4 form-inline">
      
      <label className="name">Name</label>
      <input  required placeholder='Joe Smith' type="text" name="name" id="name" className="form-control"/>
      
      <label className="email">Email address</label>
      <input  required placeholder='joe@gmail.com' type="email" name="email" id="email" className="form-control"/>
      
      <label className="date">Date</label>
      <input  required placeholder='Date' type="date" name="date" id="date" className="form-control"/>

      <label className="time">Time</label>
      <input  required placeholder='Time' type="time" name="time" id="time" className="form-control"/>
      
      <button className="btn btn-success" type="submit" style={{margin: 30 }}>Schedule now</button>
    </form>
    </div>
  );
};
}

export default Form;