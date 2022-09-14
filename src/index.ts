require("dotenv").config();

const { MongoClient } = require("mongodb");

import app from "./app";
import debug from "debug";
import * as http from "http";

const userDao = require("./app/dao/user.dao");
const passwordResetTokenDao = require("./app/dao/password-reset-token.dao");
const planDao = require("./app/dao/plan.dao");
const classDao = require("./app/dao/class.dao");
const logDao = require("./app/dao/log.dao");

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

const client = new MongoClient(process.env.MONGODB_URI);

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("sailbe:server")("Listening on " + bind);
}

async function main() {
  try {
    await client.connect();

    await userDao.initialize(client);
    await passwordResetTokenDao.initialize(client);
    await planDao.initialize(client);
    await classDao.initialize(client);
    await logDao.initialize(client);

    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  } catch (err) {
    console.error(err);
  }
}

(async () =>
  main().catch((err) => {
    console.error(err);
  }))();
