import React from 'react';
import InputField from './InputField.jsx';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import CheckBox from 'react-bootstrap/lib/CheckBox';
var data = require('json-loader!../data/ClientFormData.json');
var stateData = require('json-loader!../data/FstDispatchData.json');
var smsOptionData = require('json-loader!../data/smsOptionData.json');
var postData = require('json-loader!../data/postRequestData.json');
var formValidationData = require('json-loader!../data/formValidationData.json');

class ClientForm extends React.Component {

    constructor(props){
        super(props);
        
        this.state={

            
            //idQueueType:this.props.idQueue,
            //state:this.props.state,
            lastName:"",
            degree:"M",
            phone:"",
            optionSMS:false,


            isM:true,
            isLastNameOk:null,
            isPhoneOk:null             
            
        }

        this.handleClickM=this.handleClickM.bind(this);
        this.handleClickMme=this.handleClickMme.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);
        this.handleSmsChecked=this.handleSmsChecked.bind(this);
        this.checkParameter=this.checkParameter.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }


    handleClickM(){
        this.setState({isM:true,degree:"M"},function(){
            console.log("isM: "+this.state.isM+"\ndegree: "+this.state.degree);
        });
    }
    handleClickMme(){
        this.setState({isM:false,degree:"MME"},function(){
            console.log("isM: "+this.state.isM+"\ndegree: "+this.state.degree);
        });
    }

    handleLastNameChange(e){
        this.setState({lastName:e.target.value});
    }

    handlePhoneChange(e){
        this.setState({phone:e.target.value});
    }
    handleSmsChecked(){
        this.setState({optionSMS:!this.state.optionSMS},function(){
            console.log("optionSMS: "+this.state.optionSMS);
        });
    }
    checkParameter(){
        var result=true;
        if(this.state.lastName===""){
            this.setState({isLastNameOk:false},function(){
                console.log(this.state.isLastNameOk.toString());
            });
            result=result && false;
        }
        else{
            this.setState({isLastNameOk:true});
            result=result && true;
        }
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
    
    sendRequest(dataToSend){
        console.log("I will send a request to GDFA server");
        console.log(jQuery.isPlainObject(dataToSend).toString());
        $.ajax({
            url: 'http://localhost:8081/inStoreCustomers',
            type: 'POST',
            contentType:'application/json',
            //dataType: 'application/json',
            data: dataToSend,
            //headers:{'Access-Control-Allow-Origin':'*'},
            cache: false,
            success: function(info) {
                console.log(info)
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err.toString());
            }.bind(this)
        });
        

    }
    /*
    sendRequest(dataToSend){
        console.log("I will send a request to GDFA server");
        console.log(jQuery.isPlainObject(dataToSend).toString());
        $.ajax({
            url: 'http://localhost:8081/areas',
            type: 'GET',
            //contentType:'application/json',
            //dataType: 'application/json',
            //data: dataToSend,
            //headers:{'Access-Control-Allow-Origin':'*'},
            cache: false,
            success: function(info) {
                console.log(info)
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err.toString());
            }.bind(this)
        });
        

    }
    */
    handleSubmit(e){
        e.preventDefault();
        if(this.checkParameter())
            this.sendRequest(this.makePostData());
        
    }
    makePostData(){
        var isPro=false;
        var sms=smsOptionData.no;
        if(this.props.state===stateData[2].state)
            isPro=true;
        if(this.state.optionSMS){
            sms=smsOptionData.yes;
        }
        postData.apiPostData.lastName = this.state.lastName;
        postData.apiPostData.degree = this.state.degree;
        postData.apiPostData.phone = this.state.phone;
        postData.apiPostData.numSMS = this.state.phone;
        postData.apiPostData.isPro = isPro;
        postData.apiPostData.optionSMS.SMS_reservation = sms;
        postData.apiPostData.optionSMS.SMS_registration = sms;
        postData.apiPostData.optionSMS.SMS_yourTurn = sms;
        postData.apiPostData.idQueueType = this.props.idQueue;



        //var data = JSON.stringify(postData);

        return postData;
    }



    // Create the XHR object.
    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    makeCorsRequest() {
    // This is a sample server that supports CORS.
        var url = 'http://dv29masc02.rouen.francetelecom.fr/api-gdfa/v0/areas';

        var xhr = this.createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            console.log(text);
        };

        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Cache-Control', 'application/json');
        xhr.setRequestHeader('Content-Type', 'no-cache');
        xhr.send();
    }





    render(){
        
        return(
            <div className="ClientForm_content">
                <p>{data.title}</p>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Button active={this.state.isM} onClick={this.handleClickM}>{data.degree.content_M}</Button><Button active={!this.state.isM} onClick={this.handleClickMme}>{data.degree.content_MME}</Button>
                    </FormGroup>

                    <InputField
                    title={data.lastName.title}
                    content={data.lastName.content}
                    valide={this.state.isLastNameOk}
                    help={data.lastName.helpInfo}
                    handleContentChange={this.handleLastNameChange} 
                    />

                    <InputField
                    title={data.phone.title}
                    content={data.phone.content}
                    valide={this.state.isPhoneOk}
                    help={data.phone.helpInfo}
                    handleContentChange={this.handlePhoneChange} 
                    />

                    <FormGroup >
                        <CheckBox checked={this.state.optionSMS} onClick={this.handleSmsChecked}>
                            {data.optionSMS.content_true}
                        </CheckBox>
                    </FormGroup>

                    <Button type="submit">
                        Valider
                    </Button>


                </form>
                <br/>
                <p>idQueueType:{this.props.idQueue}</p>
                <p>state:{this.props.state}</p>
                <p>lastName:{this.state.lastName}</p>
                <p>phone:{this.state.phone}</p>
                <p>degree:{this.state.degree}</p>
                <p>optionSMS:{this.state.optionSMS}</p>
                
                
            </div>
        )
        
    }
}

export default ClientForm      
