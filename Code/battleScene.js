const battleBackgroundImage = new Image()
battleBackgroundImage.src='../Game Assets/battleBackground.png';
const battleBackground = new Sprite({
    position:{
        x:0,
        y:0
    },
    bg: battleBackgroundImage

})
const daffleImage = new Image()
daffleImage.src='../Game Assets/draggleSprite.png';
const daffle = new Sprite({
    position:{
        x: 800,
        y: 100
    },
    bg: daffleImage,
    frames:{
        max: 4,
        hold:30,
    },
    moving: true,
    isEnemy: true,
    name:'Daffle'
})
const waffleImage = new Image()
waffleImage.src='../Game Assets/embySprite.png';
const waffle= new Sprite({
    position:{
        x: 280,
        y: 325
    },
    bg: waffleImage,
    frames:{
        max: 4,
        hold:30,
    },
    moving: true,
    name:'Waffle'
})
const renderedSprites = [waffle, daffle]
function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    console.log("Animating Battle")
    battleBackground.draw()

    renderedSprites.forEach((sprite)=>{
        sprite.draw()
    })
}
queue = []
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click',(e)=>{
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        waffle.attack(
            {
                attack:selectedAttack,
                recipient: daffle,
                renderedSprites
            }
        
        )  
        const randomAttack =
        daffle.attacks[Math.floor(Math.random() * daffle.attacks.length)]

        queue.push(() => {
            daffle.attack({
                attack: randomAttack,
                recipient: waffle,
                renderedSprites
            })
        })
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
      queue[0]()
      queue.shift()
    } else e.currentTarget.style.display = 'none'
  })