import React from 'react';
//import FstDispatch_content_style from '../css/style.js'
import Choice2 from './Choice2.jsx'
var choices = require('json-loader!../data/SndDispatchData.json'); 
class SndDispatch extends React.Component {
    constructor(props){
        super(props);
    }

    

    render(){

        var choiceNode = choices.map((choice,i)=>{
            if(choice.state===this.props.state){
                var active=false;
                if(this.props.idQueue===choice.idQueue)
                    active=true;
                return(
                    <Choice2 choice={choice} 
                    handleIdQueue={this.props.handleIdQueue} 
                    handleStepFinished={this.props.handleStepFinished2}
                    active={active}
                    key={i}/>
                );
            }
        });

        return(
            <div className="SndDispatch_content">
                <div className="SndDispatch_choice_group">
                    {choiceNode}
                </div>
            </div>
        )
        
    }
}

export default SndDispatch      
