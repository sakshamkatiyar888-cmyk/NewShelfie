const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Artificial delay
server.use((req, res, next) => {
  const delay = 500 + Math.random() * 1000;

  setTimeout(() => {
    next();
  }, delay);
});

// Simulate random GET failure
server.use((req, res, next) => {
  if (
    req.method === "GET" &&
    req.path.startsWith("/notes") &&
    Math.random() < 0.2
  ) {
    return res.status(500).json({
      message: "Simulated server failure",
    });
  }

  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server running on http://localhost:3001");
});