import {Component} from 'react';
import Survey from './components/Survey';
import './App.css';

import UploadSurvey from './components/UploadSurvey';
class App extends Component {
  render() {
    return (
	    <div className="App">
	      <Survey />
	    </div>
    );
  }
}

export default App;
