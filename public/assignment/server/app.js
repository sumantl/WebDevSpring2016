module.exports = function (app, db ,mongoose){



    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    /*require("./public/assignment/server/services/form.service.server.js")(app);
    require("./public/assignment/server/services/field.service.server.js")(app);
    require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
    */
};
