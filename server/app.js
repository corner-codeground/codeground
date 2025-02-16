const express = require("express");
const passport = require("./config/passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors"); // 중복 선언 제거
const jwt = require("jsonwebtoken");
const { sequelize, Board } = require("./models");

// dotenv 설정은 가능한 최상단에서 실행
require("dotenv").config();

const authRouter = require("./routes/auth");
const commentRouter = require("./routes/route_comment");
const likeRouter = require("./routes/route_like");
const scrapRouter = require("./routes/route_scrap");
const followRouter = require("./routes/route_follow");
const postRouter = require("./routes/postRoutes");
const runCodeRouter = require("./routes/route_runCode");
const boardRouter = require("./routes/route_board");
const communityRouter = require("./routes/communityRoutes");

const app = express(); // app 생성은 dotenv 이후에 진행

// CORS 설정 (두 번 선언되어 있던 cors 관련 코드를 하나로 통합)
app.use(
  cors({
    origin: "http://localhost:3000", // 끝에 슬래시 제거 (정확한 매칭을 위해)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // Preflight Request 처리

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// 템플릿 엔진 설정 (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// JWT 인증 미들웨어
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "토큰이 유효하지 않습니다." });
    }
    req.user = user;
    next();
  });
};

// 라우터 설정
app.use("/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/likes", likeRouter);
app.use("/scraps", scrapRouter);
app.use("/follow", followRouter);
app.use("/posts", postRouter);
app.use("/runCodes", runCodeRouter);
app.use("/boards", boardRouter);
app.use("/community", communityRouter);

// 홈 화면
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// MySQL 연결 후 서버 실행
sequelize
  .sync()
  .then(async () => {
    console.log(" 데이터베이스 연결 성공");
    if (Board) {
      await Board.seedDefaultBoards();
      console.log("기본 게시판 데이터 추가 완료");
    } else {
      console.error("Board 모델이 로드되지 않았습니다.");
    }
  })
  .catch((err) => {
    console.error("데이터베이스 연결 오류:", err);
  });

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
