
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var player,playerImage;
var police, policeImage;
var ground, groundImage, invisibleGround;
var obstacleImage1, obstacleImage2, obstacleImage3;
var obstaclesGroup, birdGroup;
var birdImage;
var score
var PLAY=0
var END=1
var gameState=PLAY
var gameOver,gameOverImg;


function preload()
{
	playerImage = loadImage("playerRunning.gif");
	policeImage = loadImage("copsChasing.gif");
	groundImage = loadImage("backgroundImage.jpg")
	obstacleImage1 = loadImage("carImage.png");
	obstacleImage2 = loadImage("carImage2.png");
	obstacleImage3 = loadImage("carImage3.png");
	birdImage = loadImage("birdImage.png");
  gameOverImg = loadImage("gameOverImg.jpg");
}

function setup() {
	createCanvas(1500, 700);

  

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
    player = createSprite(1100,600,20,20);
	player.addImage(playerImage);
	player.scale = 0.15

	police = createSprite(1400,600,20,20);
	police.addImage(policeImage);

	invisibleGround = createSprite(700,700,2000,10);
	invisibleGround.visible = false;

	ground = createSprite(displayWidth,displayHeight,displayWidth,displayHeight);
	ground.addImage("ground",groundImage);
	ground.x = ground.width /2;

  gameOver = createSprite(750,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
        

        obstaclesGroup=createGroup();
        birdGroup=createGroup();

  score=0;
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(groundImage);
  
  if (gameState===PLAY){
    gameOver.visible = false;
  text("score:"+score,100,100);
  ground.velocityX=-7;

  if (ground.x < 0){
	ground.x = ground.width/2;
  }
  if(keyDown("space")&& player.y >= 599) {
	player.velocityY = -25;
  }

  player.velocityY = player.velocityY + 1
  police.velocityY = player.velocityY + 1
  }
  player.collide(invisibleGround);
  police.collide(invisibleGround);

  spawnObstacles();
  spawnBirds();
  scorePoints();
  lose();
  win();
  drawSprites();
 
}
function spawnObstacles(){
if (frameCount % 60 === 0&&gameState===PLAY){
   var obstacles = createSprite(0,625,10,40);
   obstacles.velocityX = 20;
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacleImage1);
              break;
      case 2: obstacles.addImage(obstacleImage2);
              break;
      case 3: obstacles.addImage(obstacleImage3);
              break;
      default: 
              break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 250;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacles);
 }
}
function spawnBirds(){
 if (frameCount % 200 === 0&&gameState===PLAY){
   var bird = createSprite(0,400,20,20);
   bird.velocityX = 10;
   bird.addImage(birdImage);
   bird.scale = 0.2;
   bird.lifetime = 300;
   birdGroup.add(bird);
 }


 

}
function scorePoints(){
  if(police.isTouching(obstaclesGroup)){
    score=score+1;
    obstaclesGroup.destroyEach();
    
  }
  if(police.isTouching(birdGroup)){
    score=score+1;
    birdGroup.destroyEach();
  }
}
function lose(){
  if(gameState===0&&player.isTouching(obstaclesGroup)||player.isTouching(birdGroup)){
    gameState=1;
    gameOver.visible = true;
    
    obstaclesGroup.destroyEach();
    birdGroup.destroyEach();
    player.velocityY=0;
    player.velocityY = player.velocityY + 0;
    police.velocityY = player.velocityY + 0;
    obstaclesGroup.velocityX=0;
    birdGroup.velocityX=0;
  }
}






 