var Model = require("./Model");
var User = require("./User");

function Message() {
  var MessageSchema = {
    from: User,
    to: User,
    message: String,
    sent: Date
  };
  Model.call(this, MessageSchema);
  Model.extend(Message);
}


module.exports = Message;