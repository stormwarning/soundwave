import test from 'ava'
import Helper from 'hubot-test-helper'

const helper = new Helper('../scripts/soundwave.js')

test.beforeEach(() => {
    return (this.room = helper.createRoom())
})

test.afterEach(() => {
    return this.room.destroy()
})

test('soundwave script', t => {
    t.pass()
})
