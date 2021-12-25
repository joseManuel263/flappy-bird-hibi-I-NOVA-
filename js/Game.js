class Game {
  constructor(){
    this.GameOvertext1 = createElement('h1');
    this.GameOvertext2 = createElement('h1');
    this.GameOvertext3 = createElement('h1');
  };

  getState(){
    var gameState1Ref  = database.ref('gameState1');
    gameState1Ref.on("value",function(data){
       gameState1 = data.val();
    });
  };

  update(state){
    database.ref('/').update({
      gameState1: state
    });
  };

  async start(){
    if(gameState1 === 0){
      
      player = new Player();
      
      var playerCount1Ref = await database.ref('playerCount1').once("value");
      if(playerCount1Ref.exists()){
        playerCount1 = playerCount1Ref.val();
        
        player.getCount();
        
      };
      
      form = new Form()
      form.display();
    };

   //suelo = createSprite(displayWidth/2,16*displayHeight/17+15,1500,10);
   //suelo.shapeColor = "deepskyblue";
  
   bird = createSprite(100,150);
   bird1 = createSprite(150,250);
   bird2 = createSprite(200,350);
   bird3 = createSprite(250,450);

   bird.setCollider("circle",-100,-125,150);
   bird1.setCollider("circle",-100,-125,150);
   bird2.setCollider("circle",-100,-125,150);
   bird3.setCollider("circle",-100,-125,150);

   bird.addImage("bird",birdImg);
   bird1.addImage("bird",birdImg);
   bird2.addImage("bird",birdImg);
   bird3.addImage("bird",birdImg);

   bird.scale = 0.2;
   bird1.scale = 0.2;
   bird2.scale = 0.2;
   bird3.scale = 0.2;

   
  };

  play(){
    console.log("jugando =)");

    Player.getPlayerInfo();
    player.getbirdsAtEnd();

    console.log(player.index);

    var index = 0;
    var x = 100;
    var y = 150;
  
    for(var plr in allPlayers){
      index = index + 1;
    };

    form.hideGreeting();

      background("white");

      if(keyIsDown(88)||keyIsDown(120)){
        //X
        bird.velocityY = -15;
      };

      if(keyIsDown(87)||keyIsDown(119)){
        //W
        bird1.velocityY = -15;
      };

      if(keyIsDown(80)||keyIsDown(112)){
        //P
        bird2.velocityY = -15;
      };

      if(keyIsDown(32)){
        //SPACE
        bird3.velocityY = -15;
      };
      
      bird.velocityY = bird.velocityY + 0.8;
      bird1.velocityY = bird1.velocityY + 0.8;
      bird2.velocityY = bird2.velocityY + 0.8;
      bird3.velocityY = bird3.velocityY + 0.8;
      
      if(frameCount % 100 === 0){
        pipesA = createSprite(displayWidth,4*displayHeight/5);
        pipesA.addImage("pipesA",pipesA_img);
        pipesA.velocityX = -3;
        pipesA.setCollider("rectangle",90,55,90,200);
        pipesB = createSprite(displayWidth,displayHeight/5);
        pipesB.addImage("pipesB",pipesB_img);
        pipesB.velocityX = -3;
        pipesB.setCollider("rectangle",-75,-30,90,235);
        pipesAG.add(pipesA);
        pipesBG.add(pipesB);
      };

      if(player.index !== null){
        player.distance = score;
        player.update();
      };

      if(player.distance > 1500){
        gameState1 = 2;
        player.rank += 1;
        Player.updateBirdsAtEnd(player.rank);
        console.log("Ganaste (👍 ͡❛ ᴗ ͡❛)👍");
        this.GameOvertext1.html('Ganaste (👍 ͡❛ ᴗ ͡❛)👍');
        this.GameOvertext1.position(displayWidth/2-80, displayHeight/2-50);
        this.GameOvertext3.html("Lugar: "+player.rank);
        this.GameOvertext3.position(displayWidth/2-80, displayHeight/2+30);
      };
      
      if(pipesAG.isTouching(bird)||pipesBG.isTouching(bird)||
      pipesAG.isTouching(bird1)||pipesBG.isTouching(bird1)||
      pipesAG.isTouching(bird2)||pipesBG.isTouching(bird2)||
      pipesAG.isTouching(bird3)||pipesBG.isTouching(bird3)/*||
      suelo.isTouching(bird)||suelo.isTouching(bird1)||
      suelo.isTouching(bird2)||suelo.isTouching(bird3)*/){
        gameState1 = 2;
        console.log("Perdiste ( ͡╥ ͜ʖ ͡╥)👎");
        this.GameOvertext2.html('Perdiste ( ͡╥ ͜ʖ ͡╥)👎');
        this.GameOvertext2.position(displayWidth/2-80, displayHeight/2-50);
      };

      drawSprites();
  };

  end(){
    gameOver.display();
  };
};
