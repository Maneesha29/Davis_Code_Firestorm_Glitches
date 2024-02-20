var bg_img, splash_img;
var player_img, player;
var playButton, infoButton;
var enemy,enemy_group;
var enemy1_img, enemy2_img, enemy3_img,bg2_img;
var enemy_lvl2, enemy_group2;
var enemy_2_1, enemy_2_2,enemy2;
var gameState = "wait";
var bullet_group, bullet_img,bullet
var health = 200, max_health=200;
var score=0;
var player2;


function preload(){
    splash_img = loadImage("./assets/Game_On.gif");
    bg_img = loadImage("./assets/bg.png")
    player_img = loadImage("./assets/player.png")

    enemy1_img = loadImage("./assets/enemy.png")
    enemy2_img = loadImage("./assets/ufo.png")
    enemy3_img = loadImage("./assets/asteroid.png")
    bullet_img = loadImage("./assets/bullet.png")
    
    bg2_img  = loadImage("./assets/bg2.jpg")

    enemy_2_1 = loadImage("./assets/enemy_2_1.png")
    enemy_2_2 = loadImage("./assets/enemy_2_2.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    playButton = createImg("assets/play.png");
    playButton.position(width/3+100,windowHeight/2 + 150);
    playButton.size(80,80);
    playButton.hide();

    infoButton = createImg("assets/info.png");
    infoButton.position(width/3+300,windowHeight/2 +150);
    infoButton.size(80,80);
    infoButton.hide();

    player = createSprite(width/15- 50,windowHeight/2);
    player.addImage(player_img);
    player.scale = 0.6;
    player.visible = false;

    player2 = createSprite(width/15- 50,windowHeight/2);
    player2.addImage(player_img);
    player2.scale = 0.6;
    player2.visible = false;

    enemy_group = new Group();
    bullet_group = new Group();
    enemy_group2 = new Group();

    
}

function draw(){
    if(gameState == "wait"){
        background(splash_img);
        playButton.show();
        infoButton.show();
        score = 0;
    }

    playButton.mousePressed( () => {
        playButton.hide();
        infoButton.hide();
        gameState = "level1"
        health = 200
    })

    infoButton.mousePressed(() =>{
        infoButton.hide();
        playButton.hide();
        gameState = "about"

    })

    if(gameState == "level1") {
        background(bg_img);
        player.visible = true; 
        movement();
        health_level();
        spawnEnemies();
        if(keyIsDown(32)){
            spawnBullets();
        }

    for(var i =0 ; i < enemy_group.length ; i++){
        if(bullet_group.isTouching(enemy_group.get(i))){
            score +=10;
            enemy_group.get(i).remove();
            bullet_group.destroyEach();
        }
    }
    
    for(var i =0; i< enemy_group.length; i++){
        if(player.isTouching(enemy_group.get(i))){
            health -= 100;
            enemy_group.get(i).remove();
            }
    }

    if(health >0 &&  score==10){
        
        enemy_group.destroyEach()
        bullet_group.destroyEach()
        player.visible=false;
        gameState="level1win";
    
    }

    if(health<=0){
        enemy_group.destroyEach()
        bullet_group.destroyEach()
        player.visible=false
        gameState="end";

    }
}

    if(gameState == "about"){
        aboutFunct();
    }

    if (gameState=="level1win"){
        score = 0;
        health = 200;
        level1_win()

    }

    if(gameState == "level2"){
        background(bg2_img);
        player.visible = true;
        
        movement();
        health_level();
        spawnEnemies2();
        if(keyIsDown(32)){
            spawnBullets()
        }
        
        for(var i =0 ; i < enemy_group2.length ; i++){
            if(bullet_group.isTouching(enemy_group2.get(i))){
                score +=10;
                enemy_group2.get(i).remove();
                bullet_group.destroyEach();
            }
        }
        
        for(var i =0; i< enemy_group2.length; i++){
            if((player.isTouching(enemy_group2.get(i)) ) || (enemy_group2.get(i).position.x <0)){
                health -= 100;
                console.log(health)
                enemy_group2.get(i).remove();
                }
          }

          if(health<=0){
            enemy_group2.destroyEach()
            bullet_group.destroyEach()
            player.visible=false
            gameState = "end";
    
        }

        if(health >0 &&  score==10){
        
            enemy_group.destroyEach()
            bullet_group.destroyEach()
            player.visible=false;
            gameState = "gameWin";
        
        }

    
   
    if(gameState == "gameWin"){
        gameWin();
    }

    
    if(gameState=="end"){
        gameEnd();
    }

}
    drawSprites();
    
    if (gameState == "level1" || gameState == "level2"){
        fill("black");
        textSize(40);
        text("SCORE: "+score,width/10,windowHeight/10);

    }

    
 

}


function aboutFunct(){
  
  swal({
    title : "About FireStorm",
    text : "To surpass a level you should defeat all enemies without faliure in a particular stage",
    textAlign : "CENTER",
    imageUrl : "./assets/Game_On.gif",
    imageSize:"200x200",
    confirmButtonText: "Back to HomeScreen",
    confirmButtonColor:"green",

  },
  function(){
    gameState = "wait";
  })


}

function movement(){

    
    if(player.y<20){
        player.y = 20
    }

    if(player.y>windowHeight-20){
        player.y = windowHeight-20
    }
 

    if(keyDown("UP_ARROW")){
     
        player.y -= 25;
    }
    

    if (keyDown("DOWN_ARROW")){
        
        player.y += 25;
    }
}

function spawnEnemies(){
    if (frameCount%60==0){
        var random = Math.round((Math.random()*2)+1);
        

        var randomHeight = Math.round(Math.random()*windowHeight);
        


        enemy = createSprite(width-10,randomHeight);
        switch(random){
            case 1:
                enemy.addImage(enemy1_img);
                enemy.scale = 1.3;
                enemy.velocityX = -5;
                //enemy.setCollider();
                break;

            case 2:
                enemy.addImage(enemy2_img);
                enemy.scale = 1.3;
                enemy.velocityX = -5;
                break;

            case 3:
                enemy.addImage(enemy3_img);
                enemy.scale = 0.3;
                enemy.velocityX = -5;
                break;

            default:
                break;

            
        }

        enemy_group.add(enemy);
    }
}


function spawnBullets(){
    bullet = createSprite(player.x+2,player.y+2,20,20)
    bullet.addImage(bullet_img);
    bullet.scale=0.2
    bullet.velocityX = 5
    bullet.depth = player.depth
    player.depth = player.depth+1
    bullet_group.add(bullet);
    
}

function spawnBullets2(){
    bullet = createSprite(player2.x+2,player2.y+2,20,20)
    bullet.addImage(bullet_img);
    bullet.scale=0.2
    bullet.velocityX = 5
    bullet.depth = player2.depth
    player.depth = player2.depth+1
    bullet_group.add(bullet);
    
}

function health_level(){
    stroke("lightgreen")
    strokeWeight(2);
    noFill();
    rect(width/3, windowHeight/10,max_health,20);

    noStroke();
    fill("darkgreen");
    rect(width/3, windowHeight/10,health,20)
}

function level1_win(){
    swal({
        title : "You Have Won Level 1 !!!",
        text : "To enter the next battle click deploy",
        textAlign : "CENTER",
        imageUrl : "./assets/Game_On.gif",
        imageSize:"200x200",
        confirmButtonText: "Deploy",
        confirmButtonColor:"green",
    
      },
      function(){
        gameState = "level2";
        
       
      })
}

function gameEnd(){
    swal({
        title : "Game Over",
        text : "You have lost all your health. Click Restart to deply again.",
        textAlign : "CENTER",
        imageUrl : "./assets/Game_On.gif",
        imageSize:"200x200",
        confirmButtonText: "Restart",
        confirmButtonColor:"green",
    
      },
      function(){
        gameState = "wait";
      })
}

function spawnEnemies2(){
   
    if (frameCount%60==0){
        var random = Math.round((Math.random()*2)+1);
        

        var randomHeight = Math.round(Math.random()*windowHeight);
        


        enemy2 = createSprite(width-10,randomHeight);
        switch(random){
            case 1:
                enemy2.addImage(enemy_2_1);
                enemy2.scale = 0.8;
                enemy2.velocityX = -5;
                break;

            case 2:
                enemy2.addImage(enemy_2_2);
                enemy2.scale = 0.8;
                enemy2.velocityX = -5;
                break;

            case 3:
                enemy2.addImage(enemy_2_1);
                enemy2.scale = 0.3;
                enemy2.velocityX = -5;
                break;

            default:
                break;

            
        }

        enemy_group2.add(enemy2);
    }
}


function gameWin(){
    swal({
        title : "You Have Won The Game !!!",
        text : "Click to restart game",
        textAlign : "CENTER",
        imageUrl : "./assets/Game_On.gif",
        imageSize:"200x200",
        confirmButtonText: "ReDeploy",
        confirmButtonColor:"green",
    
      },
      function(){
        gameState = "wait";
       
      })
}