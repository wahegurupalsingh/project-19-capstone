//TREX GAme by ** write your name here** using JS

//Declare variables for game objects and behaviour indicators(FLAGS)

var backgroundIMG;
var aleinIMG;
var Bullet;
var aleinShip, aleinShip2, spaceship, comet;
var score, highScore, displayHS;
var bulletGroup, aleinGroup, aleinGroup2, cometGroup;
var earthHP;
var gameState, play, END, PAUSE;
var playBTN, pauseBTN, restartBTN;
var cometIMG, restartBtnIMG;
var gameOverButtonIMG, gameOver;
var spaceshipIMG;
var shootSound;
var timeCount;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  backgroundIMG = loadImage("backgroundImgEarth.jpeg");
  cometIMG = loadImage("cometIMG.jpeg");
  aleinIMG = loadImage("aleinIMG.png");
  gameOverIMG = loadImage("gameOverIMG.png");
  restartBtnIMG = loadImage("restartbuttonIMG.jpeg");
  spaceshipIMG = loadImage("spaceship.jpeg");
  shootSound = loadSound("gunshot.mp3.mp3");
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(800, 480);

  //setting values
  gameState = 0;
  play = 0;
  END = 1;

  displayHS = true;
  score = 0;
  highScore = 0;
  earthHP = 100;

  spaceship = createSprite(400, 440, 20, 10);
  spaceship.addImage("googoogaagaa", spaceshipIMG);
  spaceship.scale = 0.7;

  timeCount = 0;
 // creating groups
  aleinGroup = createGroup();
  bulletGroup = createGroup();
  cometGroup = createGroup();
  aleinGroup2 = createGroup();
}

//All changes, conditions, manipulations, actions to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  if (gameState == play) {
    background(backgroundIMG);

    
   // displaying highscore ,score ,and time played
    stroke("white");
    strokeWeight(5);
    textSize(20);
    fill("red");
    text("SCORE: " + score, 600, 20);
    text("TIME: " + timeCount, 600, 80);

    if (score > highScore) {
      highScore = score;
    }

    //display highScore

    text("HISCORE: " + highScore, 600, 50);

    //making sure aleinship wont spawn inside comet
    if (aleinGroup.isTouching(cometGroup)) {
      aleinGroup.destroyEach();
    }

    if (aleinGroup2.isTouching(cometGroup)) {
      aleinGroup2.destroyEach();
    }
   
    //code for moving character
    spaceship.x = mouseX;

   // setting conditions for bullets
    if (bulletGroup.isTouching(aleinGroup)) {
      Bullet.destroy();
      aleinShip.destroy();
      score = score + 2;
    }

    if (bulletGroup.isTouching(aleinGroup2)) {
      Bullet.destroy();
      aleinShip2.destroy();
      score = score + 2;
    }
    
    //setting conditions for death
    if (spaceship.isTouching(cometGroup)) {
      gameState = 1;
      gameOver = createSprite(400, 100, 200, 200);
      gameOver.addImage("bruh", gameOverIMG);
      restartBTN = createSprite(400, 300, 100, 100);
      restartBTN.addImage("googoogaagaa", restartBtnIMG);
    }

    if (spaceship.isTouching(aleinGroup)) {
      gameState = 1;
      gameOver = createSprite(400, 100, 200, 200);
      gameOver.addImage("bruh", gameOverIMG);
      restartBTN = createSprite(400, 300, 100, 100);
      restartBTN.addImage("googoogaagaa", restartBtnIMG);
    }

    if (spaceship.isTouching(aleinGroup2)) {
      gameState = 1;
      gameOver = createSprite(400, 100, 200, 200);
      gameOver.addImage("bruh", gameOverIMG);
      restartBTN = createSprite(400, 300, 100, 100);
      restartBTN.addImage("googoogaagaa", restartBtnIMG);
    }
   //calling functions 
    spawnComet();
    spawnalein();
    spawnalein2();
    shoot();
    time();
  }

  if (gameState == 1) {
    bulletGroup.destroyEach();
    aleinGroup.destroyEach();
    aleinGroup2.destroyEach();
    cometGroup.destroyEach();
    background("lightred");
    spaceship.destroy();

    if (mousePressedOver(restartBTN)) {
      gameState = 0;
      gameOver.destroy();
      restartBTN.destroy();
      spaceship = createSprite(300, 420, 30, 50);
      spaceship.addImage("hallaluya", spaceshipIMG);
      spaceship.scale = 0.7;
      score = 0;
      timeCount = 0;
    }
  }

  drawSprites();
}

// functions used to spawn obstacles and bullets
function spawnComet() {
  if (frameCount % 40 == 0) {
    comet = createSprite(10, 20, 100, 100);
    comet.velocityY = 10;
    comet.x = random(1, 800);
    comet.addImage("cometIMG", cometIMG);
    comet.debug = false;
    comet.lifetime = 80;
    comet.scale = 0.8;

    cometGroup.add(comet);
  }
}

function shoot() {
  if (keyDown("space") && frameCount % 7 == 0) {
    Bullet = createSprite(mouseX, 420, 10, 40);
    Bullet.velocityY = -15;
    Bullet.lifetime = 30;
    bulletGroup.add(Bullet);
    shootSound.play();
  }
}

function spawnalein() {
  if (frameCount % 50 == 0) {
    aleinShip = createSprite(10, 20, 50, 50);
    aleinShip.velocityY = 10;
    aleinShip.x = random(1, 400);
    aleinShip.addImage("aleinIMG", aleinIMG);
    aleinShip.scale = 0.2;
    aleinShip.lifetime = 80;
    aleinGroup.add(aleinShip);
  }
}

function spawnalein2() {
  if (frameCount % 50 == 0) {
    aleinShip2 = createSprite(10, 20, 50, 50);
    aleinShip2.velocityY = 10;
    aleinShip2.x = random(400, 800);
    aleinShip2.addImage("aleinIMG", aleinIMG);
    aleinShip2.scale = 0.2;
    aleinShip2.lifetime = 80;
    aleinGroup2.add(aleinShip2);
  }
}
//calculating time survived in seconds
function time(){
  if(frameCount % 30 == 0){
    timeCount = timeCount + 1


  }
}
