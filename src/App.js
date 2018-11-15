import React, { Component } from 'react';
import './App.css';

const soundBank = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'HEATER 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'HEATER 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'HEATER 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'HEATER 4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'CLAP',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'OPEN HAT',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "KICK AND HAT",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'KICK',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'CLOSED HAT',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];



const activeStyle = {
  backgroundColor: '#baff7a',
  marginTop: 10
}

const inactiveStyle = {
  backgroundColor: '#bababa',
  marginTop: 10,
  boxShadow: "0px 3px 5px black"
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
      this.state.padStyle.backgroundColor === '#baff7a' ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: activeStyle
        });
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 50);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div id={this.props.clipId} 
        onClick={this.playSound} 
        className="drum-pad" 
        style={this.state.padStyle} >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
          {this.props.keyTrigger}
      </div>
    )
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   
   
     let padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad 
                        clipId={padBankArr[i].id} 
                        clip={padBankArr[i].url}
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode} 
                        updateDisplay={this.props.updateDisplay} 
                         />
        )
      }); 
      
        
      
    return (
      <div className="pad-bank" >
                {padBank}
            </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: String.fromCharCode(160),
      currentPadBank: soundBank   
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  
  displayClipName(name) {
    
      this.setState({
        display: name
      });
    
  }
  
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render() {
    
    
    return (
      <div id="drum-machine" className="inner-container">
        <div className="title">BEATMASTER 3000</div>
                <PadBank    
                    updateDisplay={this.displayClipName}
                    currentPadBank={this.state.currentPadBank} />
        
       

                <div className="controls-container">
        
                    
                    <p id="display">
                        {this.state.display}
                    </p>
                    
                    
                </div>

            </div>
    )
  }
}

export default App;
