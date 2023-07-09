const slug = require("mongoose-slug-updater");

const mongoose = require("mongoose");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        // id: Schema.ObjectId,
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
        videoId: { type: String, required: true },
        level: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Course", Course);
