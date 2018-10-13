/**
 * Helpful functions for player objects.
 */
 
require("utilities");
require("privateDataService");
require("publicDataService");
require("passwordRecoveryService");
 
// Load GameSparks API
var api = Spark.getGameDataService();

var player = Spark.getPlayer();

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
    },
    
    /**
     * Change the users details
     * @param {String} displayName
     * @param {String} username
     * @param {String} newPassword
     * @param {String} oldPassword
     * @param {String} email
     * ->
     */
    changeUserDetails: function(displayName, username, newPassword, oldPassword, email) {
        var playerId = player.getPlayerId();
        var playerData = utilities.getItemData("Player", playerId);
        var request = new SparkRequests.ChangeUserDetailsRequest();
        
        if (displayName.length > 0) {
            publicDataService.changeDisplayName(displayName, playerData.publicDataId);
            request.displayName = displayName;
        }
        if (username.length > 0) {
            privateDataService.changeUsername(username, playerData.privateDataId);
            request.userName = username;
        }
        if (email.length > 0) {
            passwordRecoveryService.changeEmail(email, playerData.passwordRecoveryId);
        }
        if (newPassword.length > 0) {
            request.newPassword = newPassword;
            
            if (oldPassword.length > 0) {
                request.oldPassword = oldPassword;
            }
        }
        
        var response = request.Send();
    }
};