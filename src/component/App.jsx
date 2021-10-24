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
      active: false,
      all: [],
      checked: [],
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    // Simple GET request using fetch to get all records from MongoDB
    fetch('/client')
        .then(response => response.json())
        .then(data => this.setState({ all: data }))
        .catch(err => `Error sending request to get all record from MongoDB because of ${err}` )
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.fetchData(this.props.name);
    }
  }

  handleInput(event) {
    event.preventDefault();
    alert('a new client was saved to the database');
    const inputName = this.state.name;
    const inputEmail = this.state.email;
    const inputActive = this.state.active;

    const newClient = JSON.stringify({
      name: inputName,
      email: inputEmail,
      active: inputActive,
    });

    fetch('/client', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newClient,
    })
    .then(response => response.json())
    .then(result => {
      // console.log('testing fetch POST to create client:'+ result);
      this.setState(prev => ({
        name: "",
        email: "",
        date: "",
        active: false,
        all: [...prev.all, result],
      }))})
      .catch(err => `Error sending request to create new record because of ${err}` );

    event.target.reset();
  }

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
      let sortedOut = this.state.toDel.splice(this.state.checked.indexOf(item._id),1);
      this.setState(prev => ({
        ...this.state,
        active: !prev.active,
        checked : sortedOut}))
    }
    }

  //function invoked after the delete button gets clicked
  deleteRecord() {
    if(window.confirm('Are you sure, want to delete the selected appointments?')) {
			fetch('/client', {
				method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({ids : this.state.checked}),
			})
      .then(response => {
          this.setState({ 
            ...this.state,
            checked: []});
      })
      .catch(err => `Error sending request to delete records because of ${err}`)
		};
	}

  updateRecord() {
    if (this.state.checked.length === 0) {
      alert("You haven't selected any records")
    } else if (this.state.checked.length > 1){
      alert("You can only select one record at the time")
    } else {
      const idToUpdate = this.state.checked[0];
      if(window.confirm('You are about to update the appointment')) {
        fetch(`/client/${idToUpdate}`, {
          method: 'PUT',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({id : idToUpdate}),
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => `Error sending request to update record because of ${err}`)
      };
    }
  this.setState({ 
    ...this.state,
    checked: []});
  }

  filter(){

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