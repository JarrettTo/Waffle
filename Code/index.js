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
const daffleImage = new Image()
daffleImage.src = '../Game Assets/Character/daf_down.png' 
const daffleUpImage = new Image()
daffleUpImage.src = '../Game Assets/Character/daf_up.png' 
const daffleLeftImage = new Image()
daffleLeftImage.src = '../Game Assets/Character/daf_left.png' 
const daffleRightImage = new Image()
daffleRightImage.src = '../Game Assets/Character/daf_right.png'
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
        max:3,
        hold: 15,
    },
    sprites:{
        up: playerUpImage,
        down: playerImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const daffle_npc = new Sprite({
    position:{
        x: (canvas.width/2)+ 120/2+40+850,
        y: (canvas.height/2)-40/2 +100
    },
    bg: daffleImage,
    frames: {
        max:3,
        hold: 15,
    },
    sprites:{
        up: daffleUpImage,
        down: daffleImage,
        left: daffleLeftImage,
        right: daffleRightImage
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
const battle1 = new Battle({
    id: 555,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 'Ersao'
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 'Diego'
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 'August 2019'
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 'Glorietta'
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battle2 = new Battle({
    id: 556,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 3
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 2
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 0
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 0
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battle3 = new Battle({
    id: 557,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 3
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 2
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 0
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 0
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battle4 = new Battle({
    id: 558,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 3
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 2
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 0
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 0
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battle5 = new Battle({
    id: 553,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 3
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 2
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 0
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 0
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battle6 = new Battle({
    id: 554,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 3
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 2
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 0
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 0
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."]
})

const battleArray = [battle1 , battle2, battle3, battle4, battle5, battle6]
const battleZones=[]
battleZoneMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym != 0){
            battleZones.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                    
                },
                sym: sym
            }))
        }
        
    })
})
const movables = [background,...boundaries,foreground, ...battleZones, daffle_npc]
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
function faceWaffle(){
    if(player.position.x - daffle_npc.position.x >  daffle_npc.position.y - player.position.y){
        if(player.position.x > daffle_npc.position.x){
            daffle_npc.bg = daffleRightImage
        } else{
            daffle_npc.bg = daffleRightImage
        }
        
    }
    
}
function waitForClick(element) {
    return new Promise((resolve) => {
        // Use a named function for the event listener to be able to remove it later
        const listener = () => {
            element.removeEventListener('click', listener);
            resolve();
        };
        element.addEventListener('click', listener);
    });
}

async function drawDialogue(battle_no){
    battle.initiated=true
    document.querySelector('#dialogueContainer').style.display = 'block'
    document.querySelector('#dialogueBoxInfo').style.display = 'block'
    for(let j =0; j<battle_no.dialogue.length; j++){

        document.querySelector('#dialogueBoxInfo').innerHTML = battle_no.nextDialogue()
        await waitForClick(document.querySelector('#dialogueContainer'));
    }
    document.querySelector('#dialogueContainer').style.display = 'none'
    document.querySelector('#dialogueBoxInfo').style.display = 'none'
    await moveDaffle(1250, 0)
    battle.initiated=false
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveDaffle(x, y) {
    // Loop for moving in the x-direction
    
    if(x != 0) {
        const step = x > 0 ? 2 : -2; // Determine direction of movement
        daffle_npc.moving = true
        daffle_npc.image= step ==2 ? daffle_npc.sprites.right : daffle_npc.sprites.left
        while(x != 0) {
            daffle_npc.position.x += step;
            x -= step;
            await sleep(2); // Wait for 50 milliseconds before next update
        }
    }
    // Add similar logic for y-direction if needed
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
    
    daffle_npc.draw()
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
            let index = battleArray.findIndex(element => element.id == battleZone.sym)
      
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
              }) && !battleArray[index].status
            ) {
                faceWaffle()
                console.log("X C:", battleZone.position.x)
                console.log("ILY")
                window.cancelAnimationFrame(animationId)
                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                battle.initiated = true
                player.moving=false
                gsap.to('#overlappingDiv',{
                    opacity:1,
                    repeat:3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                    
                        gsap.to("#overlappingDiv",{
                            opacity: 1,
                            duration: 0.4,
                            onComplete(){
                                initBattle(battle1)
                                animateBattle()
                                gsap.to("#overlappingDiv",{
                                    opacity: 0,
                                    duration: 0.4
                                })
                                
                            }
                        })
                    }
                })
                
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

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.loop = true;
    audio.Map.play()
    clicked = true
  }
})
console.log("WTF")