
require("playerService");

var player = Spark.getPlayer();
var playerId = player.getPlayerId();

// Create a new player entry if the player doesn't exist
if (!playerService.doesPlayerExist(playerId)) {
    playerService.createPlayer(player);
}