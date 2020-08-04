import {setGameInfo} from "./obs/obs";

let commandsHandler = {
    async handleCommand(message, channel, userstate) {
        const words = message.toLowerCase().split(' ');
        const type = words[0];
        switch (type) {
            case("!set"):
                if (userstate.username === "psihoz_ykt") {
                    const channelTown = words[1];
                    const channelRating = words[2];
                    const vs = words[2];
                    const oppName = words[3];
                    const oppRating = words[4];
                    const oppTown = words[5];
                    console.log(`${channelTown} ${channelRating} ${oppName} ${oppRating} ${oppTown}`)
                    setGameInfo("Ariy", channelTown, channelRating, oppName, oppRating, oppTown)
                    return `Info was changed: ${channelTown} ${channelRating} ${oppName} ${oppRating} ${oppTown}`
                }


        }
    }
}
export default commandsHandler;