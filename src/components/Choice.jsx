import React from 'react';
import Button from 'react-bootstrap/lib/Button'

var prio = require('json-loader!../data/PrioStateData.json');

class Choice extends React.Component{
  
 constructor(props){

     super(props);
     this.state={showModal:false};
     this.handleOnClick=this.handleOnClick.bind(this);
  }
  
  handleOnClick(){
    this.props.handleStepFinished();
    this.props.handleState(this.props.choice.state);
    if(this.props.choice.state===prio[0].state){
      this.props.handleIdQueue(prio[0].idQueue);
    }

  }
  
  render(){
      var modalClose = () => this.setState({showModal:false });
      
      return(
      <div className="choice_content">
        <Button className="choice_button" active={this.props.active} onClick={this.handleOnClick}>
            {this.props.choice.name}
        </Button>
      </div>
      
      
      );
  }
  
}

export default Choice