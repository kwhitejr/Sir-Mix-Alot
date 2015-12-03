var db = require("./DataStore.js").store;

module.exports = Model;

function Model(schema) {
  this.schema = schema;
  this.id = null;
  for (var key in schema) {
    this[key] = null;
  }
  db[this.constructor.name] = db[this.constructor.name] || [];

  Model.getNextId = function() {
    if (!db[this.name].length) {
      this.id = 1;
    } else {
      this.id = db[this.name].length;
      this.id++;
    }
    return this.id;
  };

  Model.find = function(id) {
    for (var i = 0; i < db[this.name].length; i++) {
      if (db[this.name][i].id === id) {
        return db[this.name][i];
      }
    }
    return null;
  };

  Model.extend = function(klass) {
    return true;
  };
}

Model.prototype.save = function() {
  if (this.id === null) {
    this.id = this.constructor.getNextId();
    db[this.constructor.name].push(this);
  }
  console.log(db);
};

Model.prototype.destroy = function() {
  if (this.id !== null) {

  }
};

