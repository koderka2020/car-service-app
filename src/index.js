import React from 'react';
import {render} from 'react-dom';
import Form from './component/Form';
import Appointments from './component/Appointments'

const App = () => {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Car Service Big Star</h1>
      <Form/>
      <Appointments/>
    </div>
  );
};

render(<App/>, document.getElementById('root'));