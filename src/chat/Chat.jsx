import React from 'react';
import s from './Chat.module.css'
import emotes from '../emotes/emotes'

let HtmlToReactParser = require('html-to-react').Parser;
const Chat = (props) => {


    let chatElement = props.chat.map(el => {
        let message = parseEmotes(el.message, el.userstate.emotes);
        let userColor = "";
        if(!el.userstate.color){
           el.userstate.color = getRandomColor();
        }
        return <div className={s.message}>
            <span style={{color: el.userstate.color}}> {el.userstate.username}: </span>
            <span className={s.messageText}> {message} </span>
        </div>
    })
    return (
        <div className={s.wrapper}>
            {chatElement}
        </div>
    );
};
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let parseEmotes = (message, emotes) => {
    let htmlToReactParser = new HtmlToReactParser();
    //Get chat array with DEFAULT twitch emotes
    let chatWithTwitchEmotes = parseTwitchEmotes(message, emotes)
    // Get chat string with ALL emotes
    let chatWithAllEmotes = parseBTTV(chatWithTwitchEmotes.split(" ")).join(" ");
    // Make react element from string
    return  htmlToReactParser.parse(chatWithAllEmotes)
}
let parseTwitchEmotes = (message, emotes) => {
    let newMessage = message.split("");

    for (let emoteIndex in emotes) {
        let emote = emotes[emoteIndex];

        for (let charIndexes in emote) {
            let emoteIndexes = emote[charIndexes];

            if (typeof emoteIndexes == "string") {
                emoteIndexes = emoteIndexes.split("-");
                emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])];

                for (let i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
                    newMessage[i] = "";
                }

                newMessage[emoteIndexes[0]] = `<img class="emoticon" src=http://static-cdn.jtvnw.net/emoticons/v1/${emoteIndex}/1.0\>`;
            }
        }
    }
    return newMessage.join("")
}
let parseBTTV = (chat) => {

    let newChat = [];
    chat.forEach((message, i) => {
        newChat.push(message);
        emotes.forEach(emote => {
            if (message === emote.name) {
                newChat[i] =`<img src=https://cdn.betterttv.net/emote/${emote.id}/1x>`
            }
        })

    })
    return newChat;
}

export default Chat;