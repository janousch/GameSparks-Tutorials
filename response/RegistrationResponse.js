

require("playerService");

var player = Spark.getPlayer();
if (player) {
    var playerId = player.getPlayerId();
    playerService.createPlayer(player);
} else {
    Spark.setScriptData("message", "The username is taken!");
}