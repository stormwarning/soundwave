import test from 'ava'
import Helper from 'hubot-test-helper'

const helper = new Helper('../scripts/soundwave.js')

test.beforeEach(t => {
    t.context = {
        room: helper.createRoom(),
    }
})

test.afterEach(t => {
    t.context.room.destroy()
})

test('soundwave script', async t => {
    return t.context.room.user
        .say('alice', '@soundwave status')
        .then(
            t.is(await t.context.room.messages, [
                ['alice', '@soundwave status'],
                ['soundwave', 'my status'],
            ])
        )
})
