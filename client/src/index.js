import './style.css'
import CameraWorker from './CameraWorker'

document.addEventListener('DOMContentLoaded', () => {
  const Camera = new CameraWorker()
  Camera.run()
})
