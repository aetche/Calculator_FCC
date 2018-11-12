import React from 'react';
import './App.css';

const myRegex = /\+-*\//

function MyDisplay(props){
  let op = props.value.slice(0,-1).join('').match(/\d+\.*\d*$/);
  let num = props.value.slice().join('').match(/\d+\.*\d*$/);
  return (
    <div id="display">{(myRegex.test(props.value[props.value.length-1])) ? op : num}</div>
  )
}


class Calculator extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      arrayAll: [0]
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  
  handleNumber(e){
    e.preventDefault();
    let key = e.currentTarget.textContent;
    key = parseInt(key);
    if(this.state.arrayAll[0] === 0){
      this.setState({
        arrayAll: [key]
      })
    }
    else{
      this.setState({
        arrayAll: [...this.state.arrayAll, key]
      })  
    }
  }
  
  handleOperation(e){
    e.preventDefault();
    let key = e.currentTarget.textContent; 
     if (key==='x'){
      key='*'
     }
    if(this.state.result && this.state.arrayAll[0] === 0){
      this.setState({
        arrayAll: [this.state.result, key],
        result: ''
      })
    }
    else if(/\*|-|\+|\//.test(this.state.arrayAll[this.state.arrayAll.length -1])){
      let newArray = [...this.state.arrayAll];
      newArray[newArray.length-1] = key;
      this.setState({
        arrayAll: newArray,
      })
    }
    else{
      this.setState({
        arrayAll: [...this.state.arrayAll, key]
      })  
    }
    
  }
  
  handleResult(e){
    e.preventDefault();
    let equals = eval(this.state.arrayAll.slice().join(''));
    this.setState({
      arrayAll: [equals]
    })
  }
  
  handleClear(e){
    e.preventDefault();
    this.setState({
      arrayAll: [0]
    })
  }
  
  handleDecimal(e){
    e.preventDefault();
    let lastValue = this.state.arrayAll[this.state.arrayAll.length-1];
    switch(true){
      case lastValue === undefined:
      case /\+|-|\*|\//.test(lastValue):
        this.setState({
          arrayAll: [...this.state.arrayAll, '0.']
        })
        break;
      case /\./.test(lastValue):
      case /\d*\.+\d*\.+/.test(this.state.arrayAll.concat('.').join('')):
        break;
      case /\d/.test(lastValue):
        this.setState({
          arrayAll: [...this.state.arrayAll, '.']
        })
        break;
      default:
        break;
    }
  }
 
  
  render(){    
    return(
      <div className="containerKeys">
        <div  id="containerDisplay">
          <div>{this.state.arrayAll.join('').replace('*','x')}</div>
          <MyDisplay value={this.state.arrayAll}/>
        </div>
        
        <div id="clear" onClick={this.handleClear} className="key">AC</div>
        <div id="multiply" onClick={this.handleOperation} className="key">x</div>
        <div id="divide" onClick={this.handleOperation} className="key">/</div>
        <div id="seven" onClick={this.handleNumber} className="key">7</div>
        <div id="eight" onClick={this.handleNumber} className="key">8</div>
        <div id="nine" onClick={this.handleNumber} className="key">9</div>
        <div id="subtract" onClick={this.handleOperation} className="key">-</div>
        <div id="four" onClick={this.handleNumber} className="key">4</div>
        <div id="five" onClick={this.handleNumber} className="key">5</div>
        <div id="six" onClick={this.handleNumber} className="key">6</div>
        <div id="add" onClick={this.handleOperation} className="key">+</div>
        <div id="one"  onClick={this.handleNumber} className="key">1</div>
        <div id="two"  onClick={this.handleNumber} className="key">2</div>
        <div id="three" onClick={this.handleNumber} className="key">3</div>
        <div id="equals" onClick={this.handleResult} className="key">=</div>
        <div id="zero" onClick={this.handleNumber} className="key">0</div>
        <div id="decimal" onClick={this.handleDecimal} className="key">.</div>
      </div>
    )
  }
}
      

export default Calculator;

