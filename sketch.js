var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var life = 3;



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  // Agregando la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

// Creando el sprite del jugador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   // creando sprites para representar las vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    // Creando un grupo para los zombis
    zombieGroup = new Group();
}

function draw() {
  background(0); 


    // Mostrar la imagen apropiada de acuerdo a las vidas restantes
    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  
    // Ve al estado de juego - gameState "lost" cuando queden 0 vidas
    if(life===0){
      heart1.visible = false
      heart3.visible = false
      heart2.visible = false
      player.destroy();
    }
  
  // Moviendo al jugador hacia arriba y abajo y haciendo al juego compatible con móviles usando entrada táctil
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


// Liberar balas y cambiar la imagen del tirador a posición de tiro cuando se presiona la barra espaciadora
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

// El jugador regresa a la imagen original de pie cuando  dejamos de presionar la barra espaciadora
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


// Destruir al zombi cuando el jugador lo toca
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1

       } 
 }
}

// Llamando a la función para generar zombis
enemy();

drawSprites();
text("Vidas = " + life,displayWidth-200,displayHeight/2-280)
}



// Creando una función para generar zombis
function enemy(){
  if(frameCount%50===0){

    // Dando posiciones X y Y aleatorias para que aparezcan los zombis
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
