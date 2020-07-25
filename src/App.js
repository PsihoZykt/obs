import React from 'react';
import {obsConnect, setGameInfo} from "./obs/obs";
import tmi from 'tmi.js'
import {h3lobby} from './h3lobby'



class App extends React.Component {

    constructor(props) {

        super(props);
        const options = {
            options: {
                debug: true,
                secure: true
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: "advicerfromchat",
                password: "oauth:cchg3xx5wmu0pcspo0ku3eoqmqsfxd",
            },
            channels: ['psihoz_ykt',
                "ariywariy", "nobodydie_", "bakhtik"
            ],
        };
        this.state = {chat: []}

        window.state = this.state;
        this.client = new tmi.client(options);
        this.client.connect()
        this.client.on('connected', (address, port) => {
            console.log("connected")
        });
        this.client.on('chat', (channel, userstate, message, self) => {
            if (userstate.username === "psihoz_ykt") {
                const words = message.split(' ');
                const channelTown = words[1];
                const channelRating = words[2];
                const vs = words[2];
                const oppName = words[3];
                const oppRating = words[4];
                const oppTown = words[5];
                console.log(`${channelTown} ${channelRating} ${oppName} ${oppRating} ${oppTown}`)
                setGameInfo("Ariy", channelTown, channelRating, oppName, oppRating, oppTown)
                //!set castle +3000 vs Zoom4uk 300rate Rampart
                let rating = ""
                // h3lobby.getRating("#ariywariy", words).then(
                //     el => {
                //         rating = el
                //         console.log(rating)
                //     }
                // );
            }
            // let chat =  [...this.state.chat, {name: userstate["display-name"], text: message}];
            //  this.setState({chat})
        });
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
                }> send
                </button>

                {/*<button onClick={() => {*/}
                {/*    // this.setState({...this.state, chat: [...this.state.chat, {name: "advicerfromchat", text: this.state.text}]})*/}
                {/*    // this.client.say("ariywariy", this.state.text)*/}

                {/*}*/}
                {/*}> send*/}
                {/*</button>*/}
            </div>
            {/*<div> {fromArrToComponent(this.state.chat)}</div>*/}
        </div>
    }
}

let fromArrToComponent = (arr) => {
    return arr.map(el => <div> {el.name + " " + el.text} </div>)
}
export default App;
