/**
 * Helpful functions for private data objects.
 */

require("utilities");

// Load GameSparks API
var api = Spark.getGameDataService();

// Objet for getting the private data service functions and their auto complete
var privateDataService = {
    /**
     * Create a new private data entry
     * @param {String} username
     * @param {String} private data id
     * ->
     */
    createPrivateData: function(username, id) {
        var privateDataDoc = api.createItem("PrivateData", id);
        var privateData = privateDataDoc.getData();
        privateData.username = username;
        
        utilities.saveItem(privateDataDoc, privateData);
    },
     
    /**
     * Change the username
     * @param {String} username
     * @param {String} private data id
     * ->
     */
    changeUsername: function(username, id) {
        var privateDataDoc = utilities.getItemDocument("PrivateData", id);
        var privateData = privateDataDoc.getData();
        privateData.username = username;
        
        utilities.saveItem(privateDataDoc, privateData);
    }
};