"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var task_1 = require("@/api/task");
var fomautils_1 = require("fomautils");
var image_1 = require("next/image");
var sdk_1 = require("@tma.js/sdk");
var react_1 = require("react");
var user_1 = require("@/api/user");
var TaskCard = function (_a) {
    var image = _a.image, title = _a.title, status = _a.status, id = _a.id, link = _a.link, price = _a.price, setUserData = _a.setUserData, chatId = _a.chatId, token = _a.token, balance = _a.balance, manualVerification = _a.manualVerification, claimTask = _a.claimTask, lastClaimTime = _a.lastClaimTime;
    var utils = sdk_1.initUtils();
    var _b = react_1.useState(false), startLoader = _b[0], setStartLoader = _b[1];
    var _c = react_1.useState(false), verifyLoader = _c[0], setVerifyLoader = _c[1];
    var _d = react_1.useState(false), claimLoader = _d[0], setClaimLoader = _d[1];
    var dailyBonusClaimed = null;
    if (lastClaimTime) {
        dailyBonusClaimed = new Date(lastClaimTime);
    }
    var startTask = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var claimRes, _a, lastDailyLoginClaimTime_1, newBalance_1, balanceSpan, startTaskRes;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (link) {
                        if (link.includes("t.me")) {
                            utils.openTelegramLink(link);
                            // window.open(link, "_blank");
                        }
                        else {
                            //For external links
                            utils.openLink(link);
                            // window.open(link, "_blank");
                        }
                    }
                    if (manualVerification)
                        return [2 /*return*/];
                    if (!claimTask) return [3 /*break*/, 2];
                    setClaimLoader(true);
                    return [4 /*yield*/, user_1.claimDaily(chatId, token, balance.current)];
                case 1:
                    claimRes = _c.sent();
                    if (claimRes === null || claimRes === void 0 ? void 0 : claimRes.data) {
                        _a = claimRes.data, lastDailyLoginClaimTime_1 = _a.lastDailyLoginClaimTime, newBalance_1 = _a.newBalance;
                        setClaimLoader(false);
                        setUserData(function (prev) { return (__assign(__assign({}, prev), { lastDailyLoginClaimTime: lastDailyLoginClaimTime_1, balance: newBalance_1 })); });
                        //Update balance ref with new balance after task completion
                        balance.current = claimRes.data.balance;
                        balanceSpan = document.getElementById("displayBalance");
                        if (balanceSpan) {
                            balanceSpan.innerText = "" + fomautils_1.formatNumberWithCommas((_b = claimRes.data) === null || _b === void 0 ? void 0 : _b.balance);
                        }
                        return [2 /*return*/];
                    }
                    else {
                        return [2 /*return*/, setClaimLoader(false)];
                    }
                    _c.label = 2;
                case 2:
                    //For social tasks
                    setStartLoader(true);
                    return [4 /*yield*/, task_1.startATask(chatId, id, token)];
                case 3:
                    startTaskRes = _c.sent();
                    if (startTaskRes === null || startTaskRes === void 0 ? void 0 : startTaskRes.data) {
                        setUserData(function (prev) { return (__assign(__assign({}, prev), startTaskRes.data)); });
                        setStartLoader(false);
                    }
                    else {
                        setStartLoader(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, []);
    var completeTask = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var completeTaskRes, balanceSpan;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setVerifyLoader(true);
                    return [4 /*yield*/, task_1.completeATask(chatId, id, token, balance.current)];
                case 1:
                    completeTaskRes = _b.sent();
                    if (completeTaskRes === null || completeTaskRes === void 0 ? void 0 : completeTaskRes.data) {
                        setUserData(function (prev) { return (__assign(__assign({}, prev), completeTaskRes.data)); });
                        //Update balance ref with new balance after task completion
                        balance.current = completeTaskRes.data.balance;
                        balanceSpan = document.getElementById("displayBalance");
                        if (balanceSpan) {
                            balanceSpan.innerText = "" + fomautils_1.formatNumberWithCommas((_a = completeTaskRes.data) === null || _a === void 0 ? void 0 : _a.balance);
                        }
                        setVerifyLoader(false);
                    }
                    else {
                        setVerifyLoader(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, []);
    return (react_1["default"].createElement("section", { className: "z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center" },
        react_1["default"].createElement("section", { className: "flex justify-start items-center" },
            react_1["default"].createElement("figure", { className: "w-[34px] h-[34px] relative mr-[15px] rounded-[50px]" },
                react_1["default"].createElement(image_1["default"], { src: image, alt: "Task image", fill: true })),
            price ? (react_1["default"].createElement("section", { className: "flex flex-col items-start" },
                react_1["default"].createElement("span", { className: "text-[12px] max-w-[200px] break-words" }, title),
                react_1["default"].createElement("section", { className: "flex justify-start items-center" },
                    react_1["default"].createElement("figure", { className: "w-[28px] h-[28px] relative mr-[5px]" },
                        react_1["default"].createElement(image_1["default"], { src: "/assets/icons/Earns.svg", alt: "Earn icon", fill: true })),
                    react_1["default"].createElement("span", { className: "font-semibold text-[12px]" },
                        fomautils_1.formatNumberWithCommas(price),
                        " $GAX")))) : (react_1["default"].createElement("span", { className: "text-[12px] max-w-[200px] break-words" }, title))),
        !claimTask && (react_1["default"].createElement(react_1["default"].Fragment, null,
            status == "Undone" && (react_1["default"].createElement("span", { className: "font-semibold text-[12px] bg-light_blue_1 py-[7px] px-[16px] rounded-[50px]", onClick: startTask }, startLoader ? react_1["default"].createElement("div", { className: "loader-2" }) : "Go")),
            status == "Ongoing" && (react_1["default"].createElement("span", { onClick: completeTask, className: "font-semibold text-[12px] bg-light_blue_1 py-[7px] px-[16px] rounded-[50px]" }, verifyLoader ? react_1["default"].createElement("div", { className: "loader-2" }) : "Verify")),
            status == "Done" && (react_1["default"].createElement("span", { className: "font-semibold text-[12px]" }, "Done")))),
        claimTask && !dailyBonusClaimed && (react_1["default"].createElement("span", { onClick: startTask, className: "font-semibold text-[12px] bg-light_blue_1 py-[7px] px-[16px] rounded-[50px]" }, claimLoader ? react_1["default"].createElement("div", { className: "loader-2" }) : "Claim")),
        claimTask && dailyBonusClaimed && (react_1["default"].createElement("span", { className: "font-semibold text-[12px]" }, "Claimed"))));
};
var Tasks = function (_a) {
    var tasks = _a.tasks, ongoingTasks = _a.ongoingTasks, completedTasks = _a.completedTasks, setUserData = _a.setUserData, chatId = _a.chatId, token = _a.token, balance = _a.balance, lastClaimTime = _a.lastClaimTime;
    return (react_1["default"].createElement("main", { className: "w-full bg-dark_blue_1 min-h-[100vh] flex flex-col items-center justify-start pt-[30px] px-[30px] font-[Lexend] text-[white]" },
        react_1["default"].createElement("figure", { className: "w-[140px] h-[140px] relative mb-[20px]" },
            react_1["default"].createElement(image_1["default"], { src: "/assets/images/level-1.svg", alt: "Coin image", fill: true })),
        react_1["default"].createElement("p", { className: "font-semibold text-[20px] max-w-[80%] mb-[35px] text-center" }, "Earn more by complete the following tasks"),
        tasks && (tasks === null || tasks === void 0 ? void 0 : tasks.length) > 0 && (react_1["default"].createElement("span", { className: "font-semibold mb-[15px] text-left w-full" }, "Tasks list:")),
        tasks && (tasks === null || tasks === void 0 ? void 0 : tasks.length) > 0 && (react_1["default"].createElement("section", { className: "w-full flex flex-col items-center mb-[200px]" }, tasks === null || tasks === void 0 ? void 0 : tasks.map(function (each, i) {
            var status = (ongoingTasks === null || ongoingTasks === void 0 ? void 0 : ongoingTasks.includes(each._id)) ? "Ongoing"
                : (completedTasks === null || completedTasks === void 0 ? void 0 : completedTasks.includes(each._id)) ? "Done"
                    : "Undone";
            return (react_1["default"].createElement(TaskCard, { lastClaimTime: lastClaimTime, key: i, id: each._id, status: status, title: each.title, image: each.image ? each.image : "/assets/images/avatar.svg", link: each.link, price: each.price, setUserData: setUserData, chatId: chatId, token: token, balance: balance, manualVerification: each.manualVerification, claimTask: each.claimTask }));
        })))));
};
exports["default"] = Tasks;
