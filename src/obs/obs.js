const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
export let obsConnect = () => {
    obs.connect({
        address: 'localhost:4444',
        password: ''
    })
        .then(() => {
            console.log(`Success! We're connected & authenticated.`);

            return obs.send('GetSceneList');
        })
        .then(data => {
            console.log(`${data.scenes.length} Available Scenes!`);

            data.scenes.forEach(scene => {
                if (scene.name !== data.currentScene) {
                    console.log(`Found a different scene! Switching to Scene: ${scene.name}`);

                    obs.send('SetCurrentScene', {
                        'scene-name': scene.name
                    });
                }
            });
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
        });

}
export let setGameInfo = (channelName, channelRating, channelTown, oppName, oppRating, oppTown) => {
    console.log(`${channelName} ${channelTown} ${channelRating} ${oppName} ${oppRating} ${oppTown}`)
    obs.send('SetTextGDIPlusProperties', {source: "игра", text: `${channelName} ${channelTown} ${channelRating} ${oppName} ${oppRating} ${oppTown}`}).then(data => {
        console.log(data);
    });
// obs.send('GetSourcesList').then(data => {
//         console.log(data);
//     });
    // obs.send('SetTextGDIPlusProperties', {"source": "Opp_1", "text": "Testing"}).then(data => {
    //     console.log(data);
    // }).catch(err => console.log(err));

}

export let obsTest2 = () => {
    obs.send("SetSceneItemProperties", {
        sceneName: "Сцена",
        item: "change",
        type: {}

    }).then(data => console.log(data))
}
