const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576
const collisionMapFtd = []
for(let i=0;i<collisionMap.length;i+=70){
    collisionMapFtd.push(collisionMap.slice(i,i+70))

}


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
    constructor({position, velocity, bg, frames={max:1}}){
        this.position = position
        this.image = bg
        this.frames=frames
        this.image.onload=()=>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        
        }
        
    }
    draw (){
        c.drawImage(this.image,0,0,this.image.width/this.frames.max,this.image.height,this.position.x,this.position.y,this.image.width/this.frames.max,this.image.height)
    }
}
//(canvas.width/2)+ this.image.width/2+40, (canvas.height/2)-this.image.height/2
const offset = {
    x: -500,
    y: -1600
}
const player = new Sprite({
    position:{
        x: (canvas.width/2)+ 96/2+40,
        y: (canvas.height/2)-32/2
    },
    bg: playerImage,
    frames: {
        max:3
    }
})
const background = new Sprite({
    position:{
        x: offset.x,
        y:offset.y
    },
    bg: image
})
class Boundary{
    constructor({position}){
        this.position = position
        this.width =64
        this.height =64
    }
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries=[]
collisionMapFtd.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym === 552){
            boundaries.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                }
            }))
        }
        
    })
})
const movables = [background,...boundaries]
function rectCollision({rect1, rect2}){
    return(
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height>= rect2.position.y 
    )
}
function animate(){
    window.requestAnimationFrame(animate)
    
    background.draw()
    player.draw()
    boundaries.forEach(boundary =>{
        boundary.draw()
        if(
            rectCollision({
                rect1: player,
                rect2: boundary
            })
        ){
            console.log("COL")
        }
    })
    
    if(keys.w.pressed && lastkey ==='w'){
        movables.forEach((movable)=>{
            movable.position.y+=3
        })
    }
    if(keys.a.pressed && lastkey ==='a'){
        movables.forEach((movable)=>{
            movable.position.x+=3
        })
    }
    if(keys.s.pressed && lastkey ==='s'){
        movables.forEach((movable)=>{
            movable.position.y-=3
        })
    }
    if(keys.d.pressed && lastkey ==='d'){
        movables.forEach((movable)=>{
            movable.position.x-=3
        })
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