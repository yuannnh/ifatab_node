import React from 'react';
import FstDispatch from './FstDispatch.jsx';
import SndDispatch from './SndDispatch.jsx';
import ClientForm from './ClientForm.jsx';
import RecoverForm from './RecoverForm.jsx';
import Col from 'react-bootstrap/lib/Col';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var choices = require('json-loader!../data/SndDispatchData.json'); 
class ClientPage extends React.Component {

    constructor() {
        super();
        this.state = {
            step_finished:0,
            state:choices[0].state,
            idQueue:choices[0].idQueue
            
        }

        this.handleStepFinished1=this.handleStepFinished1.bind(this);
        this.handleStepFinished2=this.handleStepFinished2.bind(this);
        this.handleState=this.handleState.bind(this);
        this.handleIdQueue=this.handleIdQueue.bind(this);

    }

    handleStepFinished1(){
        this.setState({step_finished:1},function(){
            console.log("stepfinished: "+this.state.step_finished);
        });
        
    }

    handleStepFinished2(){
        this.setState({step_finished:2},function(){
            console.log("stepfinished: "+this.state.step_finished);
        });
    }

    handleIdQueue(id){
        this.setState({idQueue:id},function(){
            console.log("idQueue changes to: "+this.state.idQueue);
        });
    }

    handleState(newstate){
        this.setState({state:newstate},function(){
            console.log("state change to: "+this.state.state);
        });
    }


    contentGenerator (step_finished,state,idQueue) {
        

        if (step_finished === 0)
            return(
                <div className="ClientPage_content">
                    <Col xs={6} md={4}>
                    <div className="FstDispatch" >
                        <FstDispatch 
                        state={state}
                        handleStepFinished1={this.handleStepFinished1}
                        handleIdQueue={this.handleIdQueue}
                        handleState={this.handleState}/>
                    </div>
                    </Col>
                </div>
            );
        else if (step_finished === 1){

            if(state==="PRIO")
                return(
                    <div className="ClientPage_content">
                        <Col xs={6} md={4}>
                        <div className="FstDispatch">
                            <FstDispatch 
                            state={state}
                            handleStepFinished1={this.handleStepFinished1}
                            handleIdQueue={this.handleIdQueue}
                            handleState={this.handleState} />      
                        </div>
                        </Col>
                        <Col xs={6} md={4}>
                         <div className="ClientForm">
                            <ReactCSSTransitionGroup transitionName = "stepAppear"
                                transitionAppear = {true} transitionAppearTimeout = {500}
                                transitionEnter = {false} transitionLeave = {false}>
                                <ClientForm 
                                handleIdQueue={this.handleIdQueue}
                                handleState={this.handleState}
                                state={state} 
                                idQueue={idQueue}
                                />
                            </ReactCSSTransitionGroup>
                        </div>
                        </Col>
                    </div>

                );
            else if(state==="RECOVER")
                return(
                    <div className="ClientPage_content">
                        <Col xs={6} md={4}>
                        <div className="FstDispatch">
                            <FstDispatch 
                            state={state}
                            handleStepFinished1={this.handleStepFinished1}
                            handleIdQueue={this.handleIdQueue}
                            handleState={this.handleState} />      
                        </div>
                        </Col>
                        <Col xs={6} md={4}>
                         <div className="RecoverForm">
                            <ReactCSSTransitionGroup transitionName = "stepAppear"
                                transitionAppear = {true} transitionAppearTimeout = {500}
                                transitionEnter = {false} transitionLeave = {false}>
                                <RecoverForm 
                                state={state} 
                                />
                            </ReactCSSTransitionGroup>
                        </div>
                        </Col>
                    </div>
                );
            else{
                return(
                    <div className="ClientPage_content">
                        <Col xs={6} md={4}>
                        <div className="FstDispatch">
                            <FstDispatch 
                            state={state}
                            handleStepFinished1={this.handleStepFinished1}
                            handleIdQueue={this.handleIdQueue}
                            handleState={this.handleState} />      
                        </div>
                        </Col>
                        <Col xs={6} md={4}>
                        <div className="SndDispatch">
                            <ReactCSSTransitionGroup transitionName = "stepAppear"
                                transitionAppear = {true} transitionAppearTimeout = {500}
                                transitionEnter = {false} transitionLeave = {false}>
                                <SndDispatch key="2" 
                                handleStepFinished2={this.handleStepFinished2}
                                handleIdQueue={this.handleIdQueue}
                                state={state} 
                                idQueue={idQueue} />
                            </ReactCSSTransitionGroup>
                        </div>
                        </Col>
                    </div>
                );
            }
        }
        else
            return(
                <div className="ClientPage_content">
                    <Col xs={6} md={4}>
                    <div className="FstDispatch">
                            <FstDispatch 
                            state={state}
                            handleStepFinished1={this.handleStepFinished1}
                            handleIdQueue={this.handleIdQueue}
                            handleState={this.handleState} />      
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                    <div className="SndDispatch">
                        <SndDispatch 
                        handleStepFinished2={this.handleStepFinished2} 
                        handleIdQueue={this.handleIdQueue}
                        state={state} 
                        idQueue={idQueue}/>
                    </div>
                    </Col>
                    <Col xs={6} md={4}>
                    <div className="ClientForm">
                        <ReactCSSTransitionGroup transitionName = "stepAppear"
                            transitionAppear = {true} transitionAppearTimeout = {500}
                            transitionEnter = {false} transitionLeave = {false}>
                            <ClientForm 
                            handleIdQueue={this.handleIdQueue}
                            handleState={this.handleState}
                            state={state} 
                            idQueue={idQueue}
                            />
                        </ReactCSSTransitionGroup>
                    </div>
                    </Col>
                </div>

            );
    }

    render(){
        const content = this.contentGenerator(this.state.step_finished,this.state.state,this.state.idQueue);
        return(
            <div className="ClientPage">
                {content}
            </div>
        )
        
    }






}

export default ClientPage