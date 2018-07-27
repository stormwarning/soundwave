const { Sonos } = require('sonos')
const speaker = new Sonos(
    process.env.HUBOT_SONOS_HOST || '192.168.86.74',
    1400,
    {
        spotify: {
            region: 'CA',
        },
    },
)

const PLAYLIST = 'spotify:user:rustyangel:playlist:30Lf4GhZN8VIvyvcCFR2BY'

function _log (...args) {
    console.log('MM-DD hh:mm:ss:iii  '.timestamp, ...args)
}

module.exports = function (robot) {
    robot.respond(/status/i, function (msg) {
        function statusMessage () {
            speaker.getSpotifyConnectInfo().then((info) => {
                msg.reply(`spotify info: ${JSON.stringify(info)}`)
            })
            speaker.deviceDescription().then((info) => {
                msg.reply(`device info: ${JSON.stringify(info)}`)
            })
            speaker.currentTrack().then((track) => {
                msg.reply(`current track: ${JSON.stringify(track)}`)
            })
        }

        return statusMessage()
    })

    robot.respond(/standup time/i, function (msg) {
        return speaker
            .play(PLAYLIST)
            .then((result) => {
                const nowPlaying = speaker.currentTrack()

                _log('Started playing', result)
                msg.reply(`Now playing ${JSON.stringify(nowPlaying)}`)
            })
            .catch((error) => {
                _log('An error occurred:', error)
                msg.reply('Sorry, I just can’t even')
            })
    })
}
