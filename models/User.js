var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);
module.exports = User;

UserSchema.pre('save', function(next) {
    var user = this;
    var currentDate = new Date();

    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});