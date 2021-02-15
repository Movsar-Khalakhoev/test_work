import axios from 'axios'

export default class CameraWorker {
  constructor() {}

  run() {
    this.getNodes() // Берем ноды
    this.initSomeVariables() // Устанавливаем необходимые поля
    this.initVideo() // Запускаем видео
    this.setCanvasText() // Устанавливаем начальный текст для canvas
    this.initListeners() // Запускаем слушатели нажатий
  }

  getNodes() {
    this.canvas = document.getElementById('canvas')
    this.video = document.querySelector('#video')
    this.snap = document.getElementById('snap')
    this.send = document.querySelector('#send')
  }

  setCanvasText() {
    this.canvasCtx.fillStyle = '#000'
    this.canvasCtx.font = 'bold 22px Arial'
    this.canvasCtx.fillText(
      'Сделайте снимок',
      this.canvas.width / 2 - 90,
      this.canvas.height / 2 + 8
    )
  }

  initVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    }
  }

  initSomeVariables() {
    this.canvasCtx = this.canvas.getContext('2d')
    this.photoWidth = this.video.getAttribute('width')
    this.photoHeight = this.video.getAttribute('height')
  }

  initListeners() {
    this.canvasCtx = this.canvas.getContext('2d')
    this.snap.addEventListener('click', this.onSnap.bind(this))
    this.send.addEventListener('click', this.onSend.bind(this))
  }

  onSnap() {
    this.canvasCtx.drawImage(
      this.video,
      0,
      0,
      this.photoWidth,
      this.photoHeight
    )
  }

  onSend() {
    axios.post('/api/send-photo', {
      img: this.canvas.toDataURL(),
    })
  }
}
