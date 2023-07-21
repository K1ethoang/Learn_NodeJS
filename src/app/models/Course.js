const slug = require("mongoose-slug-updater");
const mongoose = require("mongoose");
var mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
        videoId: { type: String, required: true },
        level: { type: String },
    },
    { timestamps: true },
);

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);
