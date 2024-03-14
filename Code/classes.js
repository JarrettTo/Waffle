/*class Sprite {
    constructor({
      position,
      velocity,
      image,
      frames = { max: 1, hold: 10 },
      sprites,
      moving = false,
      rotation = 0,
      scale = 1
    }) {
      this.position = position
      this.image = new Image()
      this.frames = { ...frames, val: 0, elapsed: 0 }
      this.image.onload = () => {
        this.width = (this.image.width / this.frames.max) * scale
        this.height = this.image.height * scale
      }
      this.image.src = image.src
  
      this.moving = moving
      this.sprites = sprites
      this.opacity = 1
  
      this.rotation = rotation
      this.scale = scale
    }
  
    draw() {
      c.save()
      c.translate(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      )
      c.rotate(this.rotation)
      c.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      )
      c.globalAlpha = this.opacity
  
      const crop = {
        position: {
          x: this.frames.val * (this.width / this.scale),
          y: 0
        },
        width: this.image.width / this.frames.max,
        height: this.image.height
      }
  
      const image = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        width: this.image.width / this.frames.max,
        height: this.image.height
      }
  
      c.drawImage(
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        image.position.x,
        image.position.y,
        image.width * this.scale,
        image.height * this.scale
      )
  
      c.restore()
  
      if (!this.moving) return
  
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
  
      if (this.frames.elapsed % this.frames.hold === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
      }
    }
  }*/
  class Sprite {
    constructor({position, velocity, bg, frames={max:1, hold: 15}, sprites, moving, rotation = 0}){
        this.position = position
        this.image = new Image()
        this.frames= {...frames, val: 0, elapsed: 0}
        this.sprites=sprites
        this.image.onload=()=>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        
        } 
        this.image.src = bg.src 
        this.moving = moving
        this.opacity = 1
        this.ocean=false
        
        this.rotation = rotation
        
    }
    draw (){
      
      c.save() 
      c.translate(this.position.x + this.width/2, this.position.y + this.height/2)
      c.rotate(this.rotation)
      c.translate(-this.position.x - this.width/2, - this.position.y - this.height/2)
      c.globalAlpha= this.opacity
      c.drawImage(this.image,this.frames.val*this.width,0,this.image.width/this.frames.max,this.image.height,this.position.x,this.position.y,this.image.width/this.frames.max,this.image.height)
      c.restore()  
      if(!this.moving){
            this.frames.val=0
            return
        }
        if(this.frames.max>1){
            this.frames.elapsed++
        }
        if(this.frames.elapsed%this.frames.hold==0){
            if(this.frames.val < this.frames.max-1) this.frames.val++
            else this.frames.val=0
        }
    }
    
    
  } 
  class Monster extends Sprite {
    constructor({
      position,
      velocity,
      bg,
      frames = { max: 1, hold: 10 },
      sprites,
      moving = false,
      rotation = 0,
      isEnemy = false,
      name,
      attacks
    }) {
      super({
        position,
        velocity,
        bg,
        frames,
        sprites,
        moving,
        rotation
      })
      this.health = 100
      
      this.isEnemy = isEnemy
      this.name = name
      this.attacks = attacks
      if(name=="Daffle"){
        console.log("X:", position.x)
        console.log("Y:", position.y)
      }
      
    }
  
    faint() {
      document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
      gsap.to(this.position, {
        y: this.position.y + 20
      })
      gsap.to(this, {
        opacity: 0
      })
      audio.battle.stop()
      audio.victory.play()
    }
  
    attack({ attack, recipient, renderedSprites }) {
      document.querySelector('#dialogueBox').style.display = 'block'
      if(!this.isEnemy){
        document.querySelector('#dialogueBox').innerHTML ="You got that right! " +this.name + ' used ' + attack.name+"!"
      }
      else{
        document.querySelector('#dialogueBox').innerHTML =
        this.name + ' used ' + attack.name
      }
      
      
      let healthBar = '#enemyHealthBar'
      if (this.isEnemy) healthBar = '#playerHealthBar'
  
      let rotation = 1
      if (this.isEnemy) rotation = -2.2
  
      recipient.health -= attack.damage
  
      switch (attack.name) {
        case 'Fireball':
          audio.initFireball.play()
          const fireballImage = new Image()
          fireballImage.src = '../Game Assets/fireball.png'
          const fireball = new Sprite({
            position: {
              x: this.position.x,
              y: this.position.y
            },
            bg: fireballImage,
            frames: {
              max: 4,
              hold: 10
            },
            moving: true,
            rotation
          })
          renderedSprites.splice(1, 0, fireball)
  
          gsap.to(fireball.position, {
            x: recipient.position.x,
            y: recipient.position.y,
            onComplete: () => {
              // Enemy actually gets hit
              audio.fireballHit.play()
              gsap.to(healthBar, {
                width: recipient.health + '%'
              })
  
              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
              })
  
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08
              })
              renderedSprites.splice(1, 1)
            }
          })
  
          break
        case 'Tackle':
          const tl = gsap.timeline()
  
          let movementDistance = 20
          if (this.isEnemy) movementDistance = -20
  
          tl.to(this.position, {
            x: this.position.x - movementDistance
          })
            .to(this.position, {
              x: this.position.x + movementDistance * 2,
              duration: 0.1,
              onComplete: () => {
                // Enemy actually gets hit
                audio.tackleHit.play()
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })
  
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })
  
                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
              }
            })
            .to(this.position, {
              x: this.position.x
            })
          break
      }
    }
  }
  
  class Boundary {
    static width = 48
    static height = 48
    constructor({ position, sym }) {
      this.position = position
      this.width = 48
      this.height = 48
      this.sym= sym
    }
  
    draw() {
      c.fillStyle = 'rgba(255, 0, 0, 0)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  }
  
  class Character extends Sprite {
    constructor({
      position,
      velocity,
      image,
      frames = { max: 1, hold: 10 },
      sprites,
      moving = false,
      rotation = 0,
      scale = 1,
      dialogue = ['']
    }) {
      super({
        position,
        velocity,
        image,
        frames,
        sprites,
        moving,
        rotation,
        scale
      })
  
      this.dialogue = dialogue
      this.dialogueIndex = 0
    }
  }

  class Battle {
    constructor({id, status, questions,dialogue, daffle_x, daffle_y, direction}){
      this.id = id
      this.status = status
      this.questions = questions
      this.dialogue = dialogue
      this.index = 0
      this.q_index=0
      this.daffle_x = daffle_x
      this.daffle_y = daffle_y
      this.direction = direction
      
    }
    nextDialogue(){
      const res = this.dialogue[this.index]
      this.index+=1
      return res
    }
    nextQuestion(){
      const res = this.questions[this.q_index]
      this.q_index+=1
      return res
    }

  }