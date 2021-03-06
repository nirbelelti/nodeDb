/**
 * Created by Live on 26-May-16.
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstname: { type: String, required: true},
    lastname:{ type: String, required: true},
    email: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true},
    gender:{ type: String, required: true},
    interestedId:{ type: String, required: true},
    occupation:{ type: String, required: true},
    hobby:{ type: String, required: true},
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var User = module.exports = mongoose.model('User',userSchema);

//Get User

module.exports.getUsers = function (callback , limit) {
    User.find(callback).limit(limit);
};
//Get User
module.exports.getUserById = function (id,callback) {
    User.findById(id ,callback);
};
//Add user
module.exports.addUser = function(user, callback){
    User.create(user,callback);
};
//Update user
module.exports.updateUserWithId = function(id,user,option,callback){
    var query = {_id:id}
    User.findOneAndUpdate(query, user,option,callback);
};
module.exports.deleteUser = function(id,callback){
    var query = {_id:id};
    User.remove(query,callback);
}