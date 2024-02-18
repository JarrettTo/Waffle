const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576
c.fillStyle="white"
c.fillRect(0,0,canvas.width, canvas.height)
const image = new Image()
image.src = '../Game Assets/WaffleVille.png'
const playerImage = new Image()
playerImage.src = '../Game Assets/Character/down.png'
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}
class Sprite {
    constructor({position, velocity, bg}){
        this.position = position
        this.image = bg
    }
    draw (){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
const background = new Sprite({
    position:{
        x: -500,
        y:-1600
    },
    bg: image
})
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(playerImage,0,0,playerImage.width/3,playerImage.height,(canvas.width/2)+ playerImage.width/2+40, (canvas.height/2)-playerImage.height/2,playerImage.width/3,playerImage.height)
    if(keys.w.pressed && lastkey ==='w'){
        background.position.y= background.position.y +3
    }
    if(keys.a.pressed && lastkey ==='a'){
        background.position.x= background.position.x +3
    }
    if(keys.s.pressed && lastkey ==='s'){
        background.position.y= background.position.y -3
    }
    if(keys.d.pressed && lastkey ==='d'){
        background.position.x= background.position.x -3
    }
}
animate()
let lastkey=''
window.addEventListener('keydown',(e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed=true;
            lastkey='w'
            break;
        case 'a':
            keys.a.pressed=true;
            lastkey='a'
            break
        case 's':
            keys.s.pressed=true;
            lastkey='s'
            break
        case 'd':
            keys.d.pressed=true;
            lastkey='d'
            break
    }
})
window.addEventListener('keyup',(e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break
        case 's':
            keys.s.pressed=false;
            break
        case 'd':
            keys.d.pressed=false;
            break
    }
})
console.log("WTF")