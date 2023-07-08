const Course = require("../models/Course");

class SiteController {
    // [GET] /
    async home(req, res) {
        // C1
        // try {
        //     res.json(await Course.find({}));
        // } catch (error) {
        //     res.status(400).json({ error: "Fail to get Course" });
        // }

        // C2: promise
        Course.find()
            .then((courses, err) => {
                res.json(courses);
            })
            .catch(() => res.status(400).json({ error: "Fail to get Course" }));
        // res.render("home");
    }

    // [GET] /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
