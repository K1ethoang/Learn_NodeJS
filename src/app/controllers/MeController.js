const Course = require("../models/Course");

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res) {
        Course.find({})
            .lean()
            .then((courses) =>
                res.render("me/stored-courses.hbs", { courses: courses }),
            );
    }
}

module.exports = new MeController();
