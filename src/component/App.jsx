import React, {Component} from 'react';
import Form from './Form';
import Appointments from './Appointments';
import '../stylesheet.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      date: "",
      reason: "",
      all: [],
      checked: [],
    }
    this.getAppointments = this.getAppointments.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleInput(event) {
    event.preventDefault();
    alert('Creating new appointment');
    const inputName = this.state.name;
    const inputEmail = this.state.email;
    const inputReason = this.state.reason;

    const newClient = JSON.stringify({
      name: inputName,
      email: inputEmail,
      reason: inputReason,
    });

    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newClient,
    })
    .then(response => response.json())
    .then(result => {
      console.log('testing fetch POST to create client:'+ result);
      this.setState(prev => ({
        name: "",
        email: "",
        date: "",
        reason: ""
      }));
      this.getAppointments();
    })
    .catch(err => `Error sending request to create new record because of ${err}` );

    event.target.reset();
  }

  getAppointments(){ 
   fetch('/')
    .then(response => response.json())
    .then(data => this.setState({ all: data }))
    .catch(err => `Error sending request to get all record from MongoDB because of ${err}` )
 }
//method to accept inputs from the form and change the state
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name] : value,
    });
  }
  
  //appending rows with checkbox clicked to this.state.toDel array, this will be sent to query our db
  handleChangeChk(event, item) {
    // console.log(item._id)
    if (event.target.checked){
      let arr = this.state.checked;
      arr.push(item._id);
      this.setState({checked : arr});
    }else{
      let sortedOut = this.state.checked.splice(this.state.checked.indexOf(item._id),1);
      this.setState({checked : sortedOut})
    }
    }

  //function invoked after the delete button gets clicked
  deleteRecord() {
    if(window.confirm('Are you sure about deleting selected appointment/s?')) {
			fetch('/', {
				method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({ids : this.state.checked}),
			})
      .then(response => this.setState({checked: []}))
      .catch(err => `Error sending request to delete records because of ${err}`)
		};
    this.getAppointments();
	}

  //method to update scheduled time => new random date/time
  updateRecord() {
    if (this.state.checked.length === 0) {
      alert("You haven't selected any records")
    } else if (this.state.checked.length > 1){
      alert("You can only select one record at the time")
    } else {
      const idToUpdate = this.state.checked[0];
      const newAppointment = new Date(new Date().getTime() + (Math.random()*180*24*60*60*1000));
      if(window.confirm('You are about to update the appointment')) {
        fetch(`/client/${idToUpdate}`, {
          method: 'PUT',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({ appointment : newAppointment}),
        })
        .then(response => console.log(response))
        .catch(err => `Error sending request to update record because of ${err}`)
      };
    }
  this.setState({ 
    ...this.state,
    checked: []});

    this.getAppointments();
  }

  filter(){

  }

componentDidMount() {
  // Simple GET request using fetch to get all records from MongoDB
  this.getAppointments();
}

render(props){
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Car Service - Big Star</h1>
      <Form {...props} handleInput={this.handleInput} handleChange={this.handleChange} state={this.state}/>
      <Appointments {...props} handleChangeChk={this.handleChangeChk} updateRecord={this.updateRecord} deleteRecord={this.deleteRecord} state={this.state}/>
    </div>
  )
}
};


export default App;