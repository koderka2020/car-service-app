import React, { Component } from 'react';
import moment from "moment";

class Appointments extends Component {

  render(){
  const recordsArr = [];
  const records = this.props.state.all;
  for (let i =0; i < records.length; i++){
    recordsArr.push(<tr key={i} style={{color: 'lightBlue'}}>
                      <td key={records[i]._id}><input className="form-check-input" type="checkbox" defaultChecked={this.props.state.active} onChange={this.props.handleChangeChk} id="flexCheckDefault" onChange={this.props.handleChangeChk}/></td>
                      <td key={records[i]._id}>{records[i].name}</td>
                      <td key={records[i]._id}>{records[i].email}</td>
                      <td key={records[i]._id}>{moment(records[i].appointment).format("MM.DD YYYY hh:mm:ss", true)}</td>
                    </tr>)
  }
  
  return (
    <div style={{padding: 30 }}>
      <h2>Scheduled Appointments:</h2>
      <button className="btn btn-success" type="submit" style={{margin: 30 }} onClick={this.props.deleteRecord}>Delete Appointment/s</button>
    <button className="btn btn-success" type="submit" style={{margin: 30 }} onClick={this.props.updateRecord}>Update Date</button>
      <table className="table table-striped table-responsive">
      <thead >
        <tr>
          <th scope="col">Select</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
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