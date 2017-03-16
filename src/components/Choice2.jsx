import React from 'react';
import Button from 'react-bootstrap/lib/Button'

class Choice2 extends React.Component{
  
 constructor(props){

     super(props);
     this.state={showModal:false};
     this.handleOnClick=this.handleOnClick.bind(this);
  }
  
  handleOnClick(){
    this.props.handleStepFinished();
    this.props.handleIdQueue(this.props.choice.idQueue);
  }
  
  render(){
      var modalClose = () => this.setState({showModal:false });
      
      return(
      <div className="choice2_content">
        <Button className="choice_button" active={this.props.active} onClick={this.handleOnClick}>
            {this.props.choice.name}
        </Button>
      </div>
      
      
      );
  }
  
}

export default Choice2