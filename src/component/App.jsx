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
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  componentDidMount() {
    // Simple GET request using fetch to get all records from MongoDB
    fetch('/client')
        .then(response => response.json())
        .then(data => this.setState({ all: data }))
        .catch(err => `Error sending request to get all record from MongoDB because of ${err}` )
  }

  componentDidUpdate(prevProps) {
    // Typical usage to compare props:
    if (this.props.name !== prevProps.name) {
      this.fetchData(this.props.name);
      // fetch('/client')
      // .then(response => response.json())
      // .then(data => this.setState({ all: data }))
      // .catch(err => `Error sending request to get all record from MongoDB because of ${err}` );
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
      console.log('testing fetch POST to create client:'+ result);
    }).catch(err => `Error sending request to create new record because of ${err}` );

    event.target.reset();
    this.setState({
      name: "",
      email: "",
      date: "",
      active: false,
    })
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name] : value,
    });
  }

  handleChangeChk(event) {
    event.preventDefault();
    this.setState({
      active: !this.state.active,
    });
  }

  deleteRecord(event) {
    event.preventDefault();


  }

  updateRecord(event) {
    event.preventDefault();


  }

render(props){
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Car Service - Big Star</h1>
      <Form {...props} handleInput={this.handleInput} handleChange={this.handleChange} state={this.state}/>
      <Appointments {...props} handleChangeChk={this.handleChangeChk} deleteRecord={this.deleteRecord} state={this.state}/>
    </div>
  )
}
};


export default App;