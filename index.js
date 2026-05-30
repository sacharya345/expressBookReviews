const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

const secret = "fingerprint_customer";

// Middleware
app.use(express.json());

// Session middleware (required by assignment)
app.use(
  "/customer",
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true
  })
);

// 🔐 JWT Middleware (protect /customer/auth/* routes)
app.use("/customer/auth/*", function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Start server
const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);