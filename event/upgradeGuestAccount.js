
require("playerService");

var data = Spark.getData();
var username = data.username;
var displayName = data.displayName;
var password = data.password;
var email = data.email;

playerService.changeUserDetails(displayName, username, password, "", email);