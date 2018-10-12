/**
 * Helpful functions for player objects.
 */
 
require("utilities");
require("privateDataService");
require("publicDataService");
require("passwordRecoveryService");
 
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
         var passwordRecoveryDocId = utilities.generateNewId();
         
         var playerDoc = api.createItem("Player", playerDocId);
         var playerData = playerDoc.getData();
         playerData.privateDataId = privateDataDocId;
         playerData.publicDataId = publicDataDocId;
         playerData.passwordRecoveryId = passwordRecoveryDocId;
         utilities.saveItem(playerDoc, playerData);
         
         // Create private and public data documents
         privateDataService.createPrivateData(username, privateDataDocId);
         publicDataService.createPublicData(displayName, publicDataDocId);
         
         // Get the email address from the players segment data and set it inside our custom database
         var email = player.getSegmentValue("email");
         passwordRecoveryService.createPasswordRecovery(email, playerId, passwordRecoveryDocId);
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