import React from 'react';

const Appointments = () => {
  return (
    <div style={{padding: 30 }}>
      <h2>Appointments</h2>
      <table class="table table-striped table-responsive">
      <thead >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th scope="col">Select</th>
        </tr>
        </thead>
        <tbody>
          <tr>
          <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
            <td>name</td>
            <td>email</td>
            <td>date</td>
          </tr>
        </tbody>
    </table>
    <button class="btn btn-success" type="submit" style={{margin: 30 }}>Delete Appointment</button>
    <button class="btn btn-success" type="submit" style={{margin: 30 }}>Update Date</button>
    </div>

  );
};


export default Appointments;