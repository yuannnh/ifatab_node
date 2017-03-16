import React from 'react';
import InputField from './InputField.jsx';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import CheckBox from 'react-bootstrap/lib/CheckBox';
import Col from 'react-bootstrap/lib/Col';
var data = require('json-loader!../data/ClientFormData.json');

class RecoverForm extends React.Component {

     constructor(props){
            super(props);
          
            this.state={
                phone:"", 
                isPhoneOk:null
            }

            this.handlePhoneChange=this.handlePhoneChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
          
        }


        handlePhoneChange(e){
            this.setState({phone:e.target.value});
        }

        checkParameter(){
            var result=true;
            if(this.state.phone.length!=10){
                this.setState({isPhoneOk:false},function(){
                    console.log(this.state.isPhoneOk.toString());
                });
                result=result && false;
            }
            else{
                this.setState({isPhoneOk:true});
                result=result && true;
            }

            return result;
        }
        sendRequest(){
            console.log("I will send a request to GDFA server");
        }
        handleSubmit(e){
            e.preventDefault();
            if(this.checkParameter())
                this.sendRequest();
            
        }

    render(){
        return(
            
            <div className="RecoverForm_content">
                <InputField
                    title={data.phone.title}
                    content={data.phone.content}
                    valide={this.state.isPhoneOk}
                    help={data.phone.helpInfo}
                    handleContentChange={this.handlePhoneChange} 
                    />
                
            </div>
            
        )
        
    }
}

export default RecoverForm 