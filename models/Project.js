var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: { type: String, required: true },
    baseUrl: { type: String, required: true },
    description: { type: String },
    isPublished: { type: Boolean },
}, { timestamps: true });

var Project = module.exports = mongoose.model('Project', ProjectSchema);