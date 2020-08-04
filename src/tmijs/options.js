let username = "advicerfromchat";
const password = "oauth:cchg3xx5wmu0pcspo0ku3eoqmqsfxd"
const channels = [
    'psihoz_ykt',
    "ariywariy",
]

const options = {
    options: {
        debug: true,
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username,
        password,
    },
    channels: channels,

};

export default options;