var db = require("./DataStore.js").store;
var extend = require("./Extend.js");


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

    // klass.getNextId = Model.getNextId;
    // klass.find = Model.find;

    for (var key in Model) {
      klass[key] = Model[key];
    }

    klass.prototype = Object.create(Model.prototype, {
      constructor: {
        value: klass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
}

Model.prototype.save = function() {
  if (this.id === null) {
    this.id = this.constructor.getNextId();
    db[this.constructor.name].push(this);
  }
};

Model.prototype.destroy = function() {
  if (this.id) {
    for (var i = 0; i < db[this.constructor.name].length; i++) {
      if (db[this.constructor.name][i].id === this.id) {
        db[this.constructor.name].splice(i, 1);
      }
    }
  }
};

module.exports = Model;
