import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
var data = require('json-loader!../data/formValidationData.json');

class InputField  extends React.Component {

    constructor(props){
            super(props);
           
            this.handleContentChange=this.handleContentChange.bind(this);
        }
    
    handleContentChange(e){
        this.props.handleContentChange(e);
    }

    render(){

        const Alert=(valide,help)=>{
            if(valide===false)
                return (
                    <div className="InputField_Alert"><p>{help}</p></div>
                );
            else
                return (
                    <div></div>
                )
        }
        
        return(
            <div className="InputField_content">
                <FormGroup>
                    <ControlLabel>{this.props.title}</ControlLabel>
                    <FormControl 
                        type="text" 
                        placeholder={this.props.content} 
                        onChange={this.handleContentChange}
                    />
                    {Alert(this.props.valide,this.props.help)}
                </FormGroup>
                    
            </div>
        )
        
    }
}

export default InputField      
