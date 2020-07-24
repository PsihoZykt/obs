import React from 'react';
import tmi from 'tmi.js'
import {obsConnect, obsTest} from "./obs/obs";

const options = {
    options: {
        debug: true,
    },
    connection: {
        reconnect: true,
    },
    identity: {
        username: "advicerfromchat",
        password: "oauth:cchg3xx5wmu0pcspo0ku3eoqmqsfxd",
    },
    channels: ['psihoz_ykt',
        // "ariywariy", "nobodydie_", "bakhtik"
    ],
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chat: [] }

        window.state = this.state;
        // this.client = new tmi.client(options);
        // this.client.connect()
        // this.client.on('connected', (address, port) => {
        //     console.log("connected")
        // });
        // this.client.on('chat', (channel, userstate, message, self) => {
        //     console.log(userstate)
        //    let chat =  [...this.state.chat, {name: userstate["display-name"], text: message}];
        //     this.setState({chat})
        // });
    }
    render() {
        return <div>
            <div>
                <input onChange={(e) => this.setState({...this.state, text: e.target.value})}/>
                <button onClick={() => {
                    // this.setState({...this.state, chat: [...this.state.chat, {name: "advicerfromchat", text: this.state.text}]})
                    // this.client.say("ariywariy", this.state.text)
                    obsConnect();
                }
                }> send</button> <button onClick={() => {
                   obsTest();
                }
                }> Test obs</button>
            </div>
            <div> {fromArrToComponent(this.state.chat)}</div>
        </div>
    }
}

let fromArrToComponent = (arr) => {
    return arr.map(el => <div> {el.name + " " +  el.text} </div>)
}
export default App;
