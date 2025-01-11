import React,{Component} from 'react';
import axios from "axios";
import './App.css';

class App extends Component{
  state ={
    input1:"",
    input2:"",
    input3:"",
    input4:"",
    input5:"",
    prediction:null,
    error:null,
  };
  handleChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value,
    });
    
  };
  handleSubmit =(e)=>{
    e.preventDefault();
    const {input1,input2,input3,input4,input5}=this.state;

    axios.post('http://127.0.0.1:8000/predict/',{
      i1:input1,
      i2:input2,
      i3:input3,
      i4:input4,
      i5:input5
    })
    .then((response) => {
      this.setState({prediction: response.data.prediction,error: null});

    })
    
  };
  render(){
    const{input1,input2,input3,input4,input5,prediction,error}=this.state;  
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
        <div className='inputbox'>
        <h1>HOME PRICE PREDICTION</h1>
        <p>SquareMeter</p>
        <input
          type="number"
          name="input1" value={input1} onChange={this.handleChange}
          placeholder="Home's SquareMeter" /><br/>
        <p>Number of Rooms</p>
        <input
          type="number"
          name="input2" value={input2} onChange={this.handleChange}
          placeholder="Number of rooms"/><br/>
        <p>Has Yard(yes:1/no:0)</p>
        <input
          type="number"
          name="input3" value={input3} onChange={this.handleChange}
          placeholder="Has Yard"/><br/>
         <p>Has Pool(yes:1/no:0)</p>
        <input
          type="number"
          name="input4" value={input4} onChange={this.handleChange}
          placeholder="Has Pool"/><br/>
        <p>Number of Floors</p>
        <input
          type="number"
          name="input5" value={input5} onChange={this.handleChange}
          placeholder="Number of Floors"/>
      </div><br/>
      <button type="submit">Submit</button>
      </form>
      {prediction !== null &&(
        <div>
          <h2 style={{marginRight:'10px',marginLeft:'20px'}}>Prediction:</h2>
          <p style={{marginRight:'10px',marginLeft:'20px'}}>{prediction}</p>
        </div>
      )}
      {error && <div>Error:{error}</div>}
    </div>
  );
}
}

export default App;
