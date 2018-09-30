/**
 * Useful functions.
 */
 
// Load GameSparks API
var api = Spark.getGameDataService();

// Object for getting the utilities functions and their auto complete
var utilities = {
    /**
     * Function for generating a random id
     * @return {String} new random id
     * ->
     */
     generateNewId: function() {
         var d = new Date().getTime();
         var uuid = 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
             var r = (d + Math.random() * 16) % 16 | 0;
             d = Math.floor(d / 16);
             return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
         });
         
         return uuid;
     },
     
     /**
      * Function for getting an item document with the provided id
      * @param {String} itemType of the item, for example "Player"
      * @param {String} itemId
      * @return {SparkDataItem}
      * ->
      */
      getItemDocument: function(itemType, itemId) {
          var item = api.getItem(itemType, itemId);
          
          var itemStatus = item.error();
          if (!itemStatus) {
              var itemDoc = item.document();
              return itemDoc;
          } else {
              return null;
          }
      },
      
      /**
       * Saves an item document
       * @param {SparkDataItem} itemDocument
       * @param {JSON} itemData
       * ->
       */
       saveItem: function(itemDocument, itemData) {
           var docStatus = itemDocument.persistor().persist().error();
           
           // Check if documents saved
           if (docStatus) {
               // return error if peristence iterrupted
               Spark.setScriptError("error", docStatus);
           } else {
               itemDocument.setData(itemData);
           }
       }
};