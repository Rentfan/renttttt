const { GenericCommand } = require('../../models/')
const { get } = require('snekfetch')
const cheerio = require('cheerio')

const indexes = {} // TODO: Move to a better place?

module.exports = new GenericCommand(
  async ({ msg, addCD }) => {
    await addCD()

    if (!indexes[msg.channel.guild.id] || indexes[msg.channel.guild.id].length === 0) {
      const data = await get('http://www.fmylife.com/random')

      if (!data || data.status !== 200) {
        return 'FML, couldn\'t find anything'
      }

      const foundStories = []
      const parser = await cheerio.load(data.text)
      parser('p.block a')
        .filter((i, story) => story.children.length > 0 && story.children[0].data.trim().length > 1)
        .map((i, story) => foundStories.push(story.children[0].data.trim()))

      indexes[msg.channel.guild.id] = foundStories
    }

    const story = indexes[msg.channel.guild.id].shift()

    return {
      description: story
    }
  }, {
    triggers: ['fml', 'fuckmylife'],
    description: 'Think you\'re having a bad day?',
    cooldown: 3000
  }
)
