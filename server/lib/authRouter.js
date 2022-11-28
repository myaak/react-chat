"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ValidateForm_1 = require("./utils/ValidateForm");
var pool = require('./db');
var bcrypt = require('bcrypt');
var router = express.Router();
router
    .route("/login")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session.user && req.session.user.email) {
            res.json({ loggedIn: true,
                email: req.session.user.email,
                username: req.session.user.username
            });
        }
        else {
            res.json({ loggedIn: false });
        }
        return [2 /*return*/];
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var potentialLogin, isPassSame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, ValidateForm_1.validateForm)(req);
                return [4 /*yield*/, pool.query("SELECT id, email, passhash, username FROM users u WHERE u.email=$1", [req.body.email])];
            case 1:
                potentialLogin = _a.sent();
                if (potentialLogin.rowCount > 0) {
                    isPassSame = bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
                    if (isPassSame) {
                        req.session.user = {
                            email: req.body.email,
                            id: potentialLogin.rows[0].id,
                            username: potentialLogin.rows[0].username
                        };
                        console.log('loggedin');
                        res.json({ loggedIn: true,
                            email: req.body.email,
                            username: req.session.user.username
                        });
                    }
                    else {
                        console.log('bad');
                        res.json({ loggedIn: false, status: "Wrong email or password" });
                    }
                }
                else {
                    console.log('bad');
                    res.json({ loggedIn: false, status: "Wrong email or password" });
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, hashedPass, newUserQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, ValidateForm_1.validateForm)(req);
                return [4 /*yield*/, pool.query("SELECT email from USERS WHERE email=$1", [req.body.email])];
            case 1:
                existingUser = _a.sent();
                if (!(existingUser.rowCount === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt.hash(req.body.password, 10)];
            case 2:
                hashedPass = _a.sent();
                return [4 /*yield*/, pool.query("INSERT INTO USERS(email, passhash) values ($1, $2) RETURNING id, email", [req.body.email, hashedPass])];
            case 3:
                newUserQuery = _a.sent();
                req.session.user = {
                    email: req.body.email,
                    id: newUserQuery.rows[0].id,
                    username: null
                };
                console.log('loggedin');
                res.json({ loggedIn: true,
                    email: req.body.email,
                    username: req.session.user.username
                });
                return [3 /*break*/, 5];
            case 4:
                res.json({ loggedIn: false, status: "Email already exists" });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/logout", function (req, res) {
    req.session.user = {
        email: null,
        id: null,
        username: null
    };
    res.json({ loggedin: false, email: null });
});
module.exports = router;
