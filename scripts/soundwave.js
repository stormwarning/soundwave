const Sonos = require('sonos').Sonos
const speaker = new Sonos(process.env.HUBOT_SONOS_HOST)

const PLAYLIST = 'spotify:user:rustyangel:playlist:30Lf4GhZN8VIvyvcCFR2BY'

function _log (...args) {
    console.log('MM-DD hh:mm:ss:iii  '.timestamp, ...args)
}

module.exports = function (robot) {
    robot.respond(/status/i, function (msg) {
        return msg.reply(`${JSON.stringify(speaker.getSpotifyConnectInfo())}`)
    })

    robot.respond(/standup time/i, function (msg) {
        speaker
            .play(PLAYLIST)
            .then((result) => {
                _log('Started playing', result)
            })
            .catch((error) => {
                _log('An error occurred:', error)
            })
    })
}
