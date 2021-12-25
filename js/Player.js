class Player {
  constructor(){
    
    this.index = null;
    this.distance = 0;
    this.rank = 0;
  };

  getCount(){
    var playerCount1Ref = database.ref('playerCount1');
    playerCount1Ref.on("value",(data)=>{
      playerCount1 = data.val();
    });
  };

  updateCount(count){
    database.ref('/').update({
      playerCount1: count
    });
  };

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      distance:this.distance
    });
  };

  static getPlayerInfo(){
    var playerInfoRef1 = database.ref('players');
    playerInfoRef1.on("value",(data)=>{
      allPlayers = data.val();
    });
  };

  getbirdsAtEnd(){
    var birdsAtEndRef = database.ref('birdsAtEnd');
    birdsAtEndRef.on("value",(data)=>{
      this.rank = data.val();
    });
  };

  static updateBirdsAtEnd(rank){
    database.ref('/').update({
      birdsAtEnd: rank
    });
  };
};