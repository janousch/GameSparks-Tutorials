/**
 * Helpful functions for public data objects.
 */
 
require("utilities");

// Load GameSparks API
var api = Spark.getGameDataService();

// Object for getting the public data service functions and their auto complete
var publicDataService = {
    /**
     * Create a new public data entry
     * @param {String} displayName
     * @param {String} id
     * ->
     */
     createPublicData: function(displayName, id) {
         var publicDataDoc = api.createItem("PublicData", id);
         var publicData = publicDataDoc.getData();
         
         // Device/Guest authentication
         if (displayName.length === 0) {
             var guestName = "Guest";
             
             var redis = Spark.getRedis();
             var guestNumber = redis.get("nextGuestNumber");
             if (guestNumber === null) {
                 guestNumber = 1;
             }
             
             guestName += guestNumber.toString();
             
             redis.set("nextGuestNumber", guestNumber + 1);
             
             displayName = guestName;
             
             var request = new SparkRequests.ChangeUserDetailsRequest();
             request.displayName = displayName;
             var response = request.Send();
         }
         
         publicData.displayName = displayName;
         
         utilities.saveItem(publicDataDoc, publicData);
     }
};