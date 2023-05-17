"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var database_1 = require("./database");
database_1.AppDataSource.initialize();
app_1.app.listen(3333, function () { return console.log("Running in port 3333"); });
