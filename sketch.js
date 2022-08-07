var bg,bgimg
var pacman,pacmanimg
var ground
var ghost,ghostimg,ghostGroup
var coin,coinimg,coinGroup
var gameover,gameoverimg
var gameState="play"

function preload(){
 bgimg=loadImage("city-night.gif")
 pacmanimg=loadImage("pac-man.gif")
 ghostimg=loadImage("ghost.gif")
 coinimg=loadImage("coins.gif")
 gameoverimg=loadImage("game-over.jpg")
}
function setup(){
 createCanvas(800,500)
 bg=createSprite(400,250,800,500)
 bg.addImage("moving",bgimg)
 bg.addImage("stoping",gameoverimg)
 bg.scale=1.8

 pacman=createSprite(99,350,20,20)
 pacman.addImage("jumping",pacmanimg)
 pacman.scale=0.3

 ground=createSprite(400,500,800,10)
 ground.visible= false
 pacman.debug=true
 pacman.setCollider("circle",0,0,300)

 //gameover=createSprite(400,250,800,500)
 //gameover.addImage("stoping",gameoverimg)

 ghostGroup=createGroup()
 coinGroup=createGroup()

}
function draw(){
 background("red")
 if(gameState==="play"){
   if(keyDown("space")){
      pacman.velocityY=-10
   }
   pacman.velocityY=pacman.velocityY+0.8
   createghost()
   createcoins()
   if(pacman.isTouching(ghostGroup)){
      gameState="end"
   }

 }
 else if(gameState==="end"){
   pacman.velocityY=0
   ghostGroup.setVelocityXEach(0)
   coinGroup.setVelocityXEach(0)
   bg.changeImage("stoping")

 }
 
 
 pacman.collide(ground)


 drawSprites()
 text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);

}
function createghost(){
 if(frameCount %150===0){  
   ghost=createSprite(780,340.20,20)
   ghost.scale=1.4
   ghost.addImage("runing",ghostimg)
   ghost.velocityX=-3
   ghostGroup.add(ghost)
   ghost.debug=true
   ghost.setCollider("circle",0,0,50)
}
}

function createcoins(){
   if(frameCount%280===0){
      coin=createSprite(780,90,20,20)
      coin.addImage("sliding",coinimg)
      coin.scale=.5
      coin.velocityX=-2
      coinGroup.add(coin)
   }
}