import React from 'react';


class Form extends React.Component {


  render() {
  return (
    <div style={{padding: 30 }}>
      <h2>Add a new appointment</h2>
      <form onSubmit={this.props.handleInput} action="/table" method="POST" className="my-4 form-inline">
      <>
        <label className="name">Name</label>
        <input  required placeholder='Joe Smith' type="text" name="name" id="name" className="form-control" value={this.props.state.name} onChange={this.props.handleChange}/>
      </>
      <label className="email">Email address</label>
      <input  required placeholder='joe@gmail.com' type="email" name="email" id="email" className="form-control" onChange={this.props.handleChange}/>
      
      <label className="time">Appointment description</label>
      <input  required placeholder='type of service' type="text" name="reason" id="reason" className="form-control" onChange={this.props.handleChange}/> 
      
      <br/>
      {/* <label className="date">Date</label>
      <input  required placeholder='Date' type="date" name="date" id="date" className="form-control"/>

      <label className="time">Time</label>
      <input  required placeholder='Time' type="time" name="time" id="time" className="form-control"/> */}
      
      {/* <button className="btn btn-success" type="submit" style={{margin: 30 }}>Schedule now</button> */}
      <button className="btn btn-success" type="submit" >Schedule within 3 months</button>

    </form>
    </div>
  );
};
}

export default Form;