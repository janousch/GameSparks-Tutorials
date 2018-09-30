/**
 * Helpful functions for player objects.
 */
 
require("utilities");
require("privateDataService");
require("publicDataService");
 
// Load GameSparks API
var api = Spark.getGameDataService();

// Object for getting the playerService functions and their auto complete
var playerService = {
    /**
     * Create a new player entry
     * @param {SparkPlayer} player
     * ->
     */
     createPlayer: function(player) {
         var playerId = player.getPlayerId();
         var username = player.getUserName();
         var displayName = player.getDisplayName();
         
         var playerDocId = playerId;
         var privateDataDocId = utilities.generateNewId();
         var publicDataDocId = utilities.generateNewId();
         
         var playerDoc = api.createItem("Player", playerDocId);
         var playerData = playerDoc.getData();
         playerData.privateDataId = privateDataDocId;
         playerData.publicDataId = publicDataDocId;
         utilities.saveItem(playerDoc, playerData);
         
         privateDataService.createPrivateData(username, privateDataDocId);
         publicDataService.createPublicData(displayName, publicDataDocId);
     },
     
     /**
      * Check if an player entry with the provided id exists
      * @param {String} playerId
      * @return {bool}
      * ->
      */
      doesPlayerExist: function(playerId) {
          var playerDoc = utilities.getItemDocument("Player", playerId);
          
          return playerDoc !== null;
      }
};