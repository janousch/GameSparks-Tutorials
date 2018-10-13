 
 require("playerService");
 
 var player = Spark.getPlayer();
 
 if (player) {
    playerService.createPlayer(player);
 } else {
    Spark.setScriptData("message", "The username is taken!");
 }