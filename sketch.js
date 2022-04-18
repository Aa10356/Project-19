var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ufo, ufo_animation, ufo_explosion
var space

var meteorGroup, meteorImg, meteor

var backgroundImg
var score = 0;

var gameOver, restart;
function preload() {
    backgroundImg = loadImage("space.jpeg");
    ufo_animation = loadImage("ufo.png");
    ufo_explosion = loadImage("explosion.png")
    meteorImg = loadImage("meteor.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    ufo = createSprite(width/2, height - 70, 20, 50);
    ufo.addAnimation("flying", ufo_animation);
    ufo.addAnimation("explosion", ufo_explosion);
    ufo.setCollider("circle", 0, 0, 350);
    ufo.scale = 0.1;

    meteorGroup = new Group();

    score = 0;
}

function draw() {
    background(backgroundImg);
    textSize(30);
    fill("white");
    text("Score: " + score, 30, 50);
    
    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
    
        spawnMeteors();

        if (keyDown("LEFT")) {
            ufo.x = ufo.x - 10;
        }
        if (keyDown("RIGHT")) {
            ufo.x = ufo.x + 10;
        }
        if (keyDown("UP")) {
            ufo.y = ufo.y - 10;
        }
        if (keyDown("DOWN")) {
            ufo.y = ufo.y + 10;
        }
  
        if(meteorGroup.isTouching(ufo)){
            gameState = END;
        }
    }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ufo.velocityY = 0;
    meteorGroup.setVelocityXEach(0);
    
    //change the trex animation
    ufo.changeAnimation("explosion",ufo_explosion);
    
    //set lifetime of the game objects so that they are never destroyed
    meteorGroup.setLifetimeEach(-1);
      
      text("Oh no, you crashed! Press SPACE to restart", width / 2, height / 5);
      text.depth = ufo.depth
      text.depth+=1
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnMeteors() {
  if (frameCount % 60 === 0) {
    var meteor = createSprite(Math.random()*width, height - height, 20, 30);
    meteor.setCollider("circle", 0, 0, 45);
    // obstacle.debug = true

    meteor.velocityY = (6 + (3 * score) / 100);

    meteor.addImage(meteorImg)

    //assign scale and lifetime to the obstacle
    meteor.scale = 0.2;
    meteor.lifetime = 300;
    meteor.depth = ufo.depth;
    ufo.depth += 1;
    //add each obstacle to the group
    meteorGroup.add(meteor);
  }
}

function reset() {
    gameState = PLAY;

    meteorGroup.destroyEach();

    ufo.x = width/2;
    ufo.y=height-70
    ufo.changeAnimation("flying", ufo_animation);

    score = 0;
}
