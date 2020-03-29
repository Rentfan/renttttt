const { GenericVoiceCommand } = require('../../models/')

module.exports = new GenericVoiceCommand({
  triggers: ['mlg', 'mlgmusic'],
  description: 'You want some sweet mlg remixes kids?',

  reaction: '😃',
  dir: 'mlg',
  ext: 'opus',
  files: 25,
  skipIfPlaying: true
})
