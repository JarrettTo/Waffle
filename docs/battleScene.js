// Using CommonJS



let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

const battleBackgroundImage = new Image()
battleBackgroundImage.src='../assets/battleBackground.png';
const battleBackground = new Sprite({
    position:{
        x:0,
        y:0
    },
    bg: battleBackgroundImage

})
function drawChoicesAndPrompt(nextQ, battle_no) {
  const attacksBox = document.querySelector('#attacksBox');
  attacksBox.replaceChildren(); // Clear existing buttons

  nextQ.choices.forEach((choice) => {
      const button = document.createElement('button');
      button.innerHTML = choice;
      // Add event listener to each button here
      button.addEventListener('click', (e) => {
          if(e.currentTarget.innerHTML == nextQ.answer){
              console.log("Correct Answer");
              const selectedAttack = attacks["Fireball"]
              waffle.attack({
                attack: selectedAttack,
                recipient: daffle,
                renderedSprites
              })
              
              if (daffle.health <= 0) {
                
                queue.push(() => {
                  daffle.faint()
                  battle_no.status=true
                  
                })
                queue.push(() => {
                  // fade back to black
                  gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                      cancelAnimationFrame(battleAnimationId)
                      animate()
                      drawDialogue(battle_no,battle_no.daffle_x, battle_no.daffle_y,battle_no.direction)
                      document.querySelector('#userInterface').style.display = 'none'
        
                      gsap.to('#overlappingDiv', {
                        opacity: 0
                      })
                      audio.Map.play()
                      if(battle_no.id == 553){
                        console.log("TESTING WHY SWAP BG")
                        background.image.src = '../assets/WaffleVille2.png'
                      

                      }
                    }
                  })
                })
              }
              nextQ = battle_no.nextQuestion()
              drawChoicesAndPrompt(nextQ,battle_no)
          } else {
              console.log("Incorrect Answer");
              console.log("FUCK")
              document.querySelector('#dialogueBox').style.display = 'block'
              document.querySelector('#dialogueBox').innerHTML ="I can't believe you forgot...ur pokemon went sleep sleep zzz"
              // Implement incorrect answer logic here
          }
          // Logic to load the next question or update the game state
          const randomAttack =
          daffle.attacks[Math.floor(Math.random() * daffle.attacks.length)]
  
        queue.push(() => {
          daffle.attack({
            attack: randomAttack,
            recipient: waffle,
            renderedSprites
          })
  
          if (waffle.health <= 0) {
            battle_no.q_index=0
            queue.push(() => {
              waffle.faint()
            })
  
            queue.push(() => {
              // fade back to black
              gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  animate()
                  document.querySelector('#userInterface').style.display = 'none'
  
                  gsap.to('#overlappingDiv', {
                    opacity: 0
                  })
  
                  battle.initiated = false
                  audio.Map.play()
                }
              })
            })
          }
        })
      });
      attacksBox.append(button);
      
  });
  
  document.querySelector('#question').innerHTML = nextQ.prompt;
}

function initBattle(battle_no) {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()
    monsters.Daffle.position= {
        x: 800,
        y: 100
    }
    monsters.Waffle.position = {
        x: 280,
        y: 325
    }
    daffle = new Monster(monsters.Daffle)
    waffle = new Monster(monsters.Waffle)
    renderedSprites = [daffle, waffle]
    queue = []
    let nextQ = battle_no.nextQuestion()
    nextQ.choices.forEach((choice) => {
      const button = document.createElement('button')
      button.innerHTML = choice
      document.querySelector('#attacksBox').append(button)
    })
    document.querySelector('#question').innerHTML = nextQ.prompt
    // our event listeners for our buttons (attack)
    document.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', (e) => {
        if(e.currentTarget.innerHTML==nextQ.answer){
          console.log("SHIT")
          const selectedAttack = attacks["Fireball"]
          waffle.attack({
            attack: selectedAttack,
            recipient: daffle,
            renderedSprites
          })
          
          if (daffle.health <= 0) {
            queue.push(() => {
              daffle.faint()
              battle_no.status=true

            })
            queue.push(() => {
              // fade back to black
              gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  animate()
                  drawDialogue(battle_no,1250,0,"left")
                  document.querySelector('#userInterface').style.display = 'none'
    
                  gsap.to('#overlappingDiv', {
                    opacity: 0
                  })
                  audio.Map.play()
                }
              })
            })
          }
          nextQ = battle_no.nextQuestion()
          drawChoicesAndPrompt(nextQ, battle_no)
        } else {
          console.log("FUCK")
          document.querySelector('#dialogueBox').style.display = 'block'
          document.querySelector('#dialogueBox').innerHTML ="I can't believe you forgot...ur pokemon went sleep sleep zzz"
        }
        const randomAttack =
          daffle.attacks[Math.floor(Math.random() * daffle.attacks.length)]
  
        queue.push(() => {
          daffle.attack({
            attack: randomAttack,
            recipient: waffle,
            renderedSprites
          })
  
          if (waffle.health <= 0) {
            battle_no.q_index=0
            queue.push(() => {
              waffle.faint()
              
            })
  
            queue.push(() => {
              // fade back to black
              gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  animate()
                  document.querySelector('#userInterface').style.display = 'none'
  
                  gsap.to('#overlappingDiv', {
                    opacity: 0
                  })
  
                  battle.initiated = false
                  audio.Map.play()
                }
              })
            })
          }
        })
  
        // daffle or enemy attacks right here
        
      })
  
      
    })
}



function animateBattle(){
    
    battleAnimationId=window.requestAnimationFrame(animateBattle)
    console.log("Animating Battle")
    battleBackground.draw()

    renderedSprites.forEach((sprite)=>{
        sprite.draw()
    })
}



document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
      queue[0]()
      queue.shift()
    } else e.currentTarget.style.display = 'none'
  })