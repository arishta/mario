kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
})
const MOVE_SPEED = 400
const JUMP_FORCE = 660
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const pipex1=1500
const pipey1= 200
const pipex2=1700
const pipey2=260
const ENEMY_SPEED = 20

// Game logic

let isJumping = true
// add([
//   rect(width(), 48),
//   pos(0, height() - 48),
//   outline(4),
//   area(),
//   solid(),
//   color(127, 200, 255),
//])
loadRoot('https://i.imgur.com/')
loadSprite('coin', 'ZDuIZVM.png?1')
loadSprite('background','0tdFv3g.png')
loadSprite('background1','VmmoGam.png?2')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'i0Jujrj.jpg?1')
loadSprite('base','H1zqVSA.png?1')
loadSprite('base1','Yd5riZI.png')
loadSprite('mario', 'p1phXk2.png?1')
loadSprite('mario1','4PpaX2S.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'XkOj7sw.png?1')
// loadSprite('2', 'gesQ1KP.png')
// loadSprite('3', 'gesQ1KP.png')
// loadSprite('4', 'gesQ1KP.png')
// loadSprite('5', 'gesQ1KP.png')
// loadSprite('6', 'gesQ1KP.png')
// loadSprite('7', 'gesQ1KP.png')
// loadSprite('8', 'gesQ1KP.png')
// loadSprite('9', 'gesQ1KP.png')
// loadSprite('A', 'gesQ1KP.png')
// loadSprite('B', 'gesQ1KP.png')
//loadSprite('C', 'gesQ1KP.png')
loadSprite('unboxed', 'PYCGp87.jpg?1')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('white','P6ypm0Y.jpg?1')
loadSprite('white1','654dae2.jpg?1')
loadSprite('white2','t2eUCKG.jpg?1')
loadSprite('white3','rMCRVN4.jpg?1')
loadSprite('side1','VqBFcIq.png')
loadSprite('white4','i0Jujrj.jpg?1')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
// layers([
//   "background",
//   "game"
// ], "game");


scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([
      sprite("background"),
      layer("bg"),
      
      pos(-1385,-1140)
    ])
    
  const maps = [
    [
  '=                                                                                            ',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';          1     2           3     4           5     6          7     8                     ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                                           ;',
  ';                                                                             -+            ;',
  ';                                                                             ()            ;',
  '! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ;',
    ]
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '!': [sprite('base'), solid()],
    '@': [sprite('base1'),solid()],
    ';': [sprite('side1'),solid()],
    '$': [sprite('coin'), 'coin'],
    '1': [sprite('surprise'), solid(), 'coin-surprise'],
    '2': [sprite('surprise'), solid(), 'coin-surprise'],
    '3': [sprite('surprise'), solid(), 'coin-surprise'],
    '4': [sprite('surprise'), solid(), 'coin-surprise'],
    '5': [sprite('surprise'), solid(), 'coin-surprise'],
    '6': [sprite('surprise'), solid(), 'coin-surprise'],
    '7': [sprite('surprise'), solid(), 'coin-surprise'],
    '8': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid(),'unboxed'],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
     '^': [sprite('evil-shroom'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    //'!': [sprite('coin-surprise'), solid(),'coin-surprise', scale(0.5)],
    // '£': [sprite('blue-brick'), solid(), scale(0.5)],
    // 'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    // '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    // 'x': [sprite('blue-steel'), solid(), scale(0.5)],

  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
  ])
  //add([text('Question ' + parseInt(level + 1) ), pos(40, 6)])
  add([sprite('white1'),pos(235,5)])
  add([text(' 2 + 3 + 5 ' ), pos(253, 11),color(0,0,0)])
  add([sprite('white'),pos(215,60)])
  add([sprite('white'),pos(332,60)])
  add([text('9            10'), pos(245, 65),color(0,0,0)])
  add([sprite('white1'),pos(620,5)])
  add([text('7 * 7 '), pos(650, 11),color(0,0,0)])
  add([sprite('white'),pos(575,60)])
  add([sprite('white'),pos(692,60)])
  add([text('14            49'), pos(605, 65),color(0,0,0)])
  add([sprite('white2'),pos(950,5)])
  add([text('Capital of India '), pos(960, 11),color(0,0,0)])
  add([sprite('white3'),pos(940,60)])
  add([sprite('white'),pos(1057,60)])
  add([text('New Delhi      Mumbai'), pos(940, 65),color(0,0,0)])
  add([sprite('white2'),pos(1270,8)])
  add([text(' National Sports of \n        India ' ), pos(1275, 11),color(0,0,0)])
  add([sprite('white'),pos(1275,60)])
  add([sprite('white'),pos(1390,60)])
  add([text('Hockey        Cricket'), pos(1283, 65),color(0,0,0)])
  add([sprite('white'),pos(1553,218)])
  add([text('Exit' ), pos(1563, 220),color(0,0,0)])
  add([text('|' ), pos(1574, 233),color(0,0,0)])
  add([text('|' ), pos(1574, 240),color(0,0,0)])
  add([text('\\\/' ), pos(1570, 240),color(0,0,0)])
  
  function big() {
    let timer = 0
    let isBig = true
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = true
      },
      biggify() {
        this.scale = vec2(2)
        timer = time
        isBig = true     
      }
    }
  }

  const player = add([
    sprite('mario'), solid(),
    pos(30, 0),
    body(),
    big(),
    origin('bot')
  ])

  action('mushroom', (m) => {
    m.move(20, 0)
  })

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 3))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('unboxed')) {
      destroy(obj)
      gameLevel.spawn('1', obj.gridPos.sub(0,0))
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', (c) => {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0)
  })

  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  keyDown('down', () => {
    camPos(player.pos)
    if (player.pos.x >= pipex1 && player.pos.y >= pipey1 && player.pos.x <= pipex2 && player.pos.y <= pipey2)
    {
      player.collides('pipe', () => {
      go('lose', { score: scoreLabel.value})
    })
  }
})

  keyDown('left', () => {
    //player.biggify();
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyDown('up', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
      //play("wooosh");
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
      //play("wooosh");
    }
  })
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width()/2, height()/ 2),sprite("background1"),
  layer("bg"),])
})

start("game", { level: 0, score: 0})
