class GameOver {
    constructor(){
        this.mensaje = createElement('h1');
        this.buttonReset = createButton('Reset');
    }
//{}
    display(){
        this.mensaje.html("Game Over  ( ◡́.◡̀)(^◡^ )");
        this.mensaje.position(displayWidth/2.6,displayHeight/3);
        this.buttonReset.position(displayWidth/2-5, displayHeight/2+30);
      
      this.buttonReset.mousePressed(()=>{
        game.update(0);
        player.updateCount(0);
        var playerInfoRef1 = database.ref('players');
        playerInfoRef1.remove();
        Player.updateBirdsAtEnd(0);
      });
    };
};