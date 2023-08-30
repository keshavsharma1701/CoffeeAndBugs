import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
      background: [220, 220, 165]
})

loadSprite("coder", "coder.png");
loadSprite("coffee", "coffee.png");
loadSprite("bug", "bugs.png");

loadSound("background", "background.mp3");
loadSound("gameover", "gameover.mp3");
loadSound("sip", "sip.mp3");
loadSound("score", "score.mp3")

const SPEED = 620;
let BSPEED = 1;
let SCORE = 0;
let bg=false;
let backgroundMusic;
let scoreText = add([
      text("Score: " +SCORE),
      scale(1.5),
      pos(width() - 290, 21),
      color(10, 10, 255)
]);

const playbg =()=>{
      if(!bg){
            backgroundMusic = play("background", {loop:true, volume: 0.5})
            bg = true;
      }
}

const displayScore = () => {
      destroy(scoreText);
      scoreText = add([
            text("Score: " +SCORE),
            scale(1.5),
            pos(width() - 290, 21),
            color(10, 10, 255)
      ])
}
const player = add([
      sprite("coder"),
      pos(100, 200),
      area(),
      scale(0.3)
])

onKeyDown("left", () => {
      playbg()
      player.move(-SPEED, 0)
})

onKeyDown("right", () => {
      playbg()
      player.move(SPEED, 0)
})
onKeyDown("up", () => {
      playbg()
      player.move(0, -SPEED)
})

onKeyDown("down", () => {
      playbg()
      player.move(0, SPEED)
})

setInterval(() => {
      for (let i = 0; i < 4; i++) {
            let x = rand(0, width())
            let y = height()
            let c = add([
                  sprite("bug"),
                  pos(x, y),
                  area(),
                  scale(0.3),
                  "bug"
            ])
            c.onUpdate(() => {
                  c.moveTo(c.pos.x, c.pos.y - BSPEED)
            })
      }
      let x = rand(0, width())
      let y = height()
      let c = add([
            sprite("coffee"),
            pos(x, y),
            area(),
            scale(0.3),
            "coffee"
      ])
      c.onUpdate(() => {
            c.moveTo(c.pos.x, c.pos.y - BSPEED)
      })
      if(BSPEED<=15){
      BSPEED+=1
      }
}, 4000)

player.onCollide("coffee", (coffee) => {
      play("sip", {volume: 2});
      destroy(coffee);
      SCORE += 1;
      displayScore()
})
player.onCollide("bug", () => {
      play("gameover", {volume: 2});
      destroy(player);
      addKaboom(player.pos)
})

displayScore()