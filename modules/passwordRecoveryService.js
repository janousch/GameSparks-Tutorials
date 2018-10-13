/**
 * Helpful functions for the password recovery objects.
 */

require("utilities");

// Load GameSparks API
var api = Spark.getGameDataService();

// Object for getting the password recovery service functions and their auto complete
var passwordRecoveryService = {
    /**
     * Create a new password recovery entry
     * @param {String} email
     * @param {String} playerId
     * @param {String} document id
     * ->
     */
    createPasswordRecovery: function(email, playerId, id) {
        var passwordRecoveryDoc = api.createItem("PasswordRecovery", id);
        var passwordRecoveryData = passwordRecoveryDoc.getData();
        
        passwordRecoveryData.email = email;
        passwordRecoveryData.token = "";
        passwordRecoveryData.playerId = playerId;
        
        utilities.saveItem(passwordRecoveryDoc, passwordRecoveryData);
    },
    
    /**
     * Change the email of this user
     * @param {String} email
     * @param {String} document id
     * ->
     */
    changeEmail: function(email, id) {
        var passwordRecoveryDoc = utilities.getItemDocument("PasswordRecovery", id);
        var passwordRecoveryData = passwordRecoveryDoc.getData();
        
        passwordRecoveryData.email = email;
        
        utilities.saveItem(passwordRecoveryDoc, passwordRecoveryData);
    }
};