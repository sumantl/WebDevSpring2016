module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({

            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "email": [String],
            "phones": [String],
            "roles": [String]
        }, {collection: "user"}
    );

    return userSchema;

};