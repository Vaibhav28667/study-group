const { Schema, model } = require('../connection');

const groupSchema = new Schema({
    name: String,
    description: { type: String, require: true },
    owner: { type: String, require: true },
    members: { type: Number, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String, require: true },
    membersArray: { type: Array, default: [] }
}, { timestamps: true });

module.exports = model('Group', groupSchema);