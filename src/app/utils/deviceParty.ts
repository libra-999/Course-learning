export const allowCamera = () => {
   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}