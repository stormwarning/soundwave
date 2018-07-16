const Sonos = require('sonos').Sonos
const speaker = new Sonos(process.env.HUBOT_SONOS_HOST)

module.exports = function(robot) {
    robot.respond(/status/i, function(msg) {
        return msg.reply(`${JSON.stringify(speaker.getSpotifyConnectInfo())}`)
    })
}
