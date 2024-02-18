const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576
const collisionMapFtd = []
for(let i=0;i<collisionMap.length;i+=70){
    collisionMapFtd.push(collisionMap.slice(i,i+70))

} 
const battleZoneMap = []
for(let i=0;i<battleZonesData.length;i+=70){
    battleZoneMap.push(battleZonesData.slice(i,i+70))

} 

c.fillStyle="white"
c.fillRect(0,0,canvas.width, canvas.height)
const image = new Image()
image.src = '../Game Assets/WaffleVille.png'
const foregroundImage = new Image()
foregroundImage.src = '../Game Assets/Foreground.png'
const playerImage = new Image()
playerImage.src = '../Game Assets/Character/down.png' 
const playerUpImage = new Image()
playerUpImage.src = '../Game Assets/Character/up.png' 
const playerLeftImage = new Image()
playerLeftImage.src = '../Game Assets/Character/left.png' 
const playerRightImage = new Image()
playerRightImage.src = '../Game Assets/Character/right.png'
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


//(canvas.width/2)+ this.image.width/2+40, (canvas.height/2)-this.image.height/2
const offset = {
    x: -500,
    y: -1600
}

const player = new Sprite({
    position:{
        x: (canvas.width/2)+ 120/2+40,
        y: (canvas.height/2)-40/2
    },
    bg: playerImage,
    frames: {
        max:3
    },
    sprites:{
        up: playerUpImage,
        down: playerImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})
const background = new Sprite({
    position:{
        x: offset.x,
        y:offset.y
    },
    bg: image
})
const foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    bg: foregroundImage
  })

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

const battleZones=[]
battleZoneMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym === 552){
            battleZones.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                }
            }))
        }
        
    })
})
const movables = [background,...boundaries,foreground, ...battleZones]
function rectCollision({rect1, rect2}){
    return(
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height>= rect2.position.y 
    )
}
const battle={
    initiated: false
}
function animate(){
    const animationId = window.requestAnimationFrame(animate)
    let moving = true
    background.draw()
    
    boundaries.forEach(boundary =>{
        boundary.draw()
        
    })
    battleZones.forEach(battleZone =>{
        battleZone.draw()
        
    })
    player.draw()
    foreground.draw()
    player.moving=false
    if(battle.initiated){
        return
    }
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed|| keys.d.pressed ){
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =
                (Math.min(
                player.position.x + player.width,
                battleZone.position.x + battleZone.width
                ) -
                Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(
                player.position.y + player.height,
                battleZone.position.y + battleZone.height
                ) -
                Math.max(player.position.y, battleZone.position.y))
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...battleZone,
                  position: {
                    x: battleZone.position.x,
                    y: battleZone.position.y
                  }
                }
              }) 
            ) {
            
                console.log("ILY")
                window.cancelAnimationFrame(animationId)
                battle.initiated = true
                player.moving=false
                gsap.to('#overlappingDiv',{
                    opacity:1,
                    repeat:4,
                    yoyo: true,
                    duration: 0.4
                })
                animateBattle();
                break
            }
        }
    }
    if(keys.w.pressed && lastkey ==='w'){
        player.moving = true
        player.image=player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                  }
                }
              })
            ) {
                
              moving = false
              break
            }
        }
        if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
        
            
    }
    else if(keys.a.pressed && lastkey ==='a'){
        player.moving = true
        player.image=player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                  }
                }
              })
            ) {
              moving = false
              break
            }
        }
        
      
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.x += 3
        })
        
    }
    else if(keys.s.pressed && lastkey ==='s'){
        player.moving = true
        player.image=player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                    }
                })
            ) {
                moving = false
                break
            }
        }
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if(keys.d.pressed && lastkey ==='d'){
        player.moving = true
        player.image=player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                    }
                })
            ){
                moving = false
                break
            }
        }
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }
}
animate()
function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    console.log("Animating Battle")
}
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