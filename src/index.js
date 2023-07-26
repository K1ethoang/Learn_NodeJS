const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes/index");
const db = require("./config/database/index");

// Connect DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Method Override
app.use(methodOverride("_method"));

// Custome Middlewares
app.use(SortMiddleware);

// HTTP logger
app.use(morgan("dev"));

// Template Engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";

                const types = {
                    default: "asc",
                    desc: "asc",
                    asc: "desc",
                };

                const icons = {
                    default: "oi oi-elevator",
                    asc: "oi oi-sort-ascending",
                    desc: "oi oi-sort-descending",
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
            },
        },
    }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
