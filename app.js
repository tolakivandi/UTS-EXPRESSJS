var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var flash = require("express-flash");
var session = require("express-session");
const MemoryStore = require("session-memory-store")(session);

var labRouter = require("./routes/lab");
var peminjammanRoter = require("./routes/peminjaman");
var penggunaRouter = require("./routes/pengguna");
const { strict } = require("assert");
const dashboardRouter = require("./routes/dashboard");
const indexRouter = require("./routes/index");
const SuperRouter = require("./routes/superusers");
const MahasiswaRouter = require("./routes/mahasiswa");
const MahasiswaLabRouter = require("./routes/peminjamanMahasiswa");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    cookie: {
      maxAge: 60000000000,
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      //domain: domainkkitananti.com',
    },
    store: new MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: "secret",
  })
);

app.use(flash());

app.use("/", indexRouter);
app.use("/lab", labRouter);
app.use("/pengguna", penggunaRouter);
app.use("/peminjaman", peminjammanRoter);
app.use("/dashboard", dashboardRouter);
app.use("/superusers",SuperRouter);
app.use("/mahasiswa", MahasiswaRouter);
app.use("/mahasiswa/lab", MahasiswaLabRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
