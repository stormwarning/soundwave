'use strict'

/**
 * @todo Switch back to AVA for tests
 */

/* global afterEach, beforeEach, describe, it */
const path = require('path')

const chai = require('chai')
const Hubot = require('hubot')

const expect = chai.expect
const Robot = Hubot.Robot
const TextMessage = Hubot.TextMessage

chai.use(require('sinon-chai'))

describe('the robot', () => {
    let robot, user

    beforeEach(() => {
        robot = new Robot(null, 'mock-adapter-v3', false, 'soundwave')
        robot.loadFile(path.resolve('scripts/'), 'soundwave.js')
        robot.adapter.on('connected', () =>
            robot.brain.userForId('1', {
                name: 'alice',
                real_name: 'Alice',
                room: '#botpark',
            }),
        )
        robot.run()
        user = robot.brain.userForName('alice')
    })

    afterEach(() => {
        robot.shutdown()
    })

    it('displays Spotify status', (done) => {
        robot.adapter.on('send', function (envelope, strings) {
            const lines = strings[0].split('\n')

            expect(lines[0]).to.match(/my status/i)

            done()
        })

        return robot.adapter.receive(new TextMessage(user, '@soundwave status'))
    })
})
