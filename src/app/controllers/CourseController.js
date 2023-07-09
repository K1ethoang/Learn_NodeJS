const Course = require("../models/Course");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => res.render("courses/show", { course: course }))
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res) {
        res.render("courses/create");
    }

    // [GET] /courses/store
    store(req, res) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
