const embyImage = new Image()
embyImage.src = '../Game Assets/embySprite.png'
const draggleImage = new Image()
draggleImage.src = '../Game Assets/draggleSprite.png'
const monsters = {
    Waffle: {
      position: {
        x: 280,
        y: 325
      },
      bg: {
        src: '../Game Assets/embySprite.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      moving: true,
      name: 'Waffle',
      attacks: [attacks['Tackle'], attacks['Fireball']]
    },
    Daffle: {
      position: {
        x: 800,
        y: 100
      },
      bg: {
        src: '../Game Assets/draggleSprite.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      moving: true,
      isEnemy: true,
      name: 'Daffle',
      attacks: [attacks['Tackle'], attacks['Fireball']]
    }
  }