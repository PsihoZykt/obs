import React from 'react';
import tmi from 'tmi.js'
import options from './tmijs/options'
import commandsHandler from "./commandsHandler";
import Chat from "./chat/Chat";
let  randomColorsChosen = {};
let defaultColors = [
    '#FF0000','#0000FF','#008000','#B22222','#FF7F50',
    '#9ACD32','#FF4500','#2E8B57','#DAA520','#D2691E',
    '#5F9EA0','#1E90FF','#FF69B4','#8A2BE2','#00FF7F'
]
function resolveColor(chan, name, color) {
    if(color !== null) {
        return color;
    }
    if(!(chan in randomColorsChosen)) {
        randomColorsChosen[chan] = {};
    }
    if(name in randomColorsChosen[chan]) {
        color = randomColorsChosen[chan][name];
    }
    else {
        color = defaultColors[Math.floor(Math.random()*defaultColors.length)];
        randomColorsChosen[chan][name] = color;
    }
    return color;
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chat: []}
        window.state = this.state;
        this.client = new tmi.client(options);
        this.client.connect()
        this.client.on('connected', (address, port) => {
            console.log("connected")
        });
        this.client.on('chat', (channel, userstate, message, self) => {
            if(this.state.chat.length > 10){
                this.state.chat.shift()
            }
            userstate.color = resolveColor(channel, userstate.username, userstate.color);
            console.log(message)
            this.setState({
                ...this.state, chat: [...this.state.chat,
                    {
                        userstate, message
                    }]
            })
            // commandsHandler.handleCommand(message, channel, userstate)
        });
    }

    render() {
        return <Chat chat={this.state.chat}/>
    }
}

export default App;
