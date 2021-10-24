import React, { Component } from 'react';
import moment from "moment";

class Appointments extends Component {

  render(){
  const recordsArr = [];
  const records = this.props.state.all;
  for (let i =0; i < records.length; i++){
    const item = records[i];
    recordsArr.push(<tr key={i} style={{color: 'lightBlue'}}>
                      <td ><input value={item._id} id={item._id} className="form-check-input" type="checkbox" defaultChecked={this.props.state.active} onChange={(event)=> this.props.handleChangeChk(event, item)}/></td>
                      <td >{records[i].name}</td>
                      <td >{records[i].email}</td>
                      <td >{records[i].reason}</td>
                      <td >{moment(records[i].appointment).format("MM.DD YYYY hh:mm:ss", true)}</td>
                    </tr>)
  }
  
  return (
    <div style={{padding: 30 }}>
      <h2>Scheduled Appointments:</h2>
      <button className="btn btn-success" type="submit" onClick={this.props.deleteRecord}>Delete Appointment/s</button>
      <button className="btn btn-success" type="submit" onClick={this.props.updateRecord}>Update Appointment</button>
      <button className="btn btn-success" type="submit" onClick={this.props.filter}>Filter Appointments by date</button>
      <table className="table table-striped table-responsive">
      <thead >
        <tr>
          <th scope="col">Select</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Description</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
          {recordsArr}
        </tbody>
    </table>
    </div>

  );
  }
};


export default Appointments;