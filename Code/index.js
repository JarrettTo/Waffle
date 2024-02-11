const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576
c.fillStyle="white"
c.fillRect(0,0,canvas.width, canvas.height)
const image = new Image()
image.src = '../Game Assets/WaffleVille.png'
const playerImage = new Image()
playerImage.src = '../Game Assets/preview.png'


image.onload = ()=>{
    c.drawImage(image, -500, -1600)
    c.drawImage(playerImage, 0, 0)
}


console.log("WTF")