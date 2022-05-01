import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'

const KeyCodes = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Punchy Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  }
]

class DrumMachine extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeButton: '',
      keyPressed: '',
      keyCodes: KeyCodes
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.playMusic = this.playMusic.bind(this)
  }
  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  playMusic (elementId) {
    var audio = document.getElementById(elementId)
    audio.play()
  }

  handleClick (e) {
    console.log(e.target.id)
    let keyId = e.target.id
    let arr = this.state.keyCodes
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == keyId) {
        this.setState(() => {
          return {
            activeButton: arr[i].id
          }
        })
        this.playMusic(arr[i].keyTrigger)
      }
    }
  }
  handleKeyPress (e) {
    let keyPress = e.key.toUpperCase()
    let keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
    if (keys.includes(keyPress)) {
      this.playMusic(keyPress)
    }
  }

  render () {
    return (
      <div className='container'>
        <h1 className='text-center'>Drum Machine</h1>
        <div id='drum-machine'>
          {this.state.keyCodes.map(item => {
            return (
              <button
                className='drum-pad'
                id={item.id}
                key={item.id}
                onClick={this.handleClick}
              >
                {item.keyTrigger}
                <audio
                  src={item.url}
                  className='clip'
                  id={item.keyTrigger}
                ></audio>
              </button>
            )
          })}
          <div id='display' className='col-4'>
            <h4>Naming That Sound</h4>
            <div id='button-activated'>{this.state.activeButton}</div>
          </div>
        </div>
      </div>
    )
  }
}
const appTarget = document.querySelector('#app')

ReactDOM.render(<DrumMachine />, appTarget)
