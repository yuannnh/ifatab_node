import React from 'react';
//import FstDispatchData from '../data/FstDispatchData.js';
//import FstDispatch_content_style from '../css/style.js'
import Choice from './Choice.jsx'
var choices = require('json-loader!../data/FstDispatchData.json'); 

class FstDispatch extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        var choiceNode = choices.map((choice,i)=>{
            var active=false;
            if(this.props.state===choice.state)
                active=true;
            return(
                <Choice choice={choice} 
                handleState={this.props.handleState} 
                handleStepFinished={this.props.handleStepFinished1}
                handleIdQueue={this.props.handleIdQueue}
                active={active}
                key={i}/>
            );
        });
        return(
            <div className="FstDispatch_content" >
                <div className="FstDispatch_choice_group">
                    {choiceNode}
                </div>
            </div>
        )
        
    }
}

export default FstDispatch      
