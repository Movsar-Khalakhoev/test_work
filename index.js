const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const TelegramBot = require('node-telegram-bot-api')
const config = require('./config.json')
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
const bot = new TelegramBot(config.BOT_TOKEN, { polling: true })

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.post('/api/send-photo', (req, res) => {
  try {
    const chatId = config.CHAT_ID
    bot.sendPhoto(
      chatId,
      Buffer.from(req.body.img.replace(`data:image/png;base64,`, ''), 'base64')
    )
    return res.status(200).json({})
  } catch (e) {
    console.log(e)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App has been started at port ${PORT}`))
