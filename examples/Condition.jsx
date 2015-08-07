import React from 'react';
import Look from '../src/index';
import Color from 'color';

class Condition extends React.Component {
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
		this.onClicksCount = this.onClicksCount.bind(this);
    this.state = {
      mode: 'default',
			clicks : 0
    }
  }

  onClick() {
    if (this.state.mode == 'important') {
      this.setState({
        mode: 'disabled'
      })
    } else if (this.state.mode == 'disabled') {
      this.setState({
        mode: 'default'
      })
    } else if (this.state.mode == 'active'){
			this.setState({mode: 'important'})
		} else {
      this.setState({
        mode: 'active'
      })
    }
  }
	
	onClicksCount(){
		this.setState({
			clicks : this.state.clicks +1
		})
	}
	

  look() {
    return {
      states: {
        padding: 5,
				marginBottom: 5,
				border: '1px solid gray',
        fontSize: 17,
        'mode=important': {
          backgroundColor: 'rgba(182, 49, 40, 0.66)'
        },
        'mode=disabled': {
          backgroundColor: 'rgba(133, 133, 133, 0.58)'
        },
        'mode=active': {
          backgroundColor: 'rgba(86, 150, 177, 0.81)'
        },
				'mode=default' : {
					backgroundColor: 'transparent'
				}
      },
			
			clicks : {
				padding: 5,
				border: '1px solid gray',
				fontSize: 17,
				'clicks<20' : {
					backgroundColor: Color('green').alpha((this.state.clicks + 1) / 20).rgbString()
				},
				'clicks=20' : {
					backgroundColor: 'green'
				},
				'clicks>20' : {
					backgroundColor: 'red'
				}
			}
    }
  }

  render() { 
		let text = 'Click Me! ' + (20 - this.state.clicks) + ' times left';
		if (this.state.clicks == 20) {
			text= "HORAAAY";
		} else if (this.state.clicks > 20) {
			text ="Alright stop it.. " + (this.state.clicks) + ' clicks';
		}
    return (
      <div>
        <div look="states" onClick={this.onClick}>Click Me! Active Mode: {this.state.mode}</div>
			<div look="clicks" onClick={this.onClicksCount}>{text}</div>
      </div>
    )
  }
}
export default Look(Condition);