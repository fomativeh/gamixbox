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
exports.__esModule = true;
exports.claimDaily = exports.buyBooster = exports.buyMultitap = exports.fetchFriends = exports.updateBalance = exports.updateWalletAddress = exports.fetchUserAccount = void 0;
var callEndpoint_1 = require("@/app/utils/callEndpoint");
var API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
exports.fetchUserAccount = function (chatId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId, "GET", {}, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                console.log(error_1);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateWalletAddress = function (chatId, walletAddress, token) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId + "/updateWalletAddress", "PATCH", { walletAddress: walletAddress }, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                console.log(error_2);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateBalance = function (chatId, newBalance, token) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/coinBalance/" + chatId, "PATCH", { newBalance: newBalance }, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                console.log(error_3);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchFriends = function (chatId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId + "/referrals", "GET", token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                console.log(error_4);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.buyMultitap = function (chatId, token, currentBalance) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId + "/multitap", "POST", { currentBalance: currentBalance }, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _c.sent();
                console.log(error_5);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.buyBooster = function (chatId, token, type, currentBalance) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_6;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId + "/booster", "POST", { currentBalance: currentBalance, type: type }, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                console.log(error_6);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.claimDaily = function (chatId, token, currentBalance) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_7;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, callEndpoint_1["default"](API_BASE_URL, "/user/" + chatId + "/claim", "POST", { currentBalance: currentBalance }, token)];
            case 1:
                res = _c.sent();
                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.success) {
                    return [2 /*return*/, { success: true, data: (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _c.sent();
                console.log(error_7);
                return [2 /*return*/, { success: false }];
            case 3: return [2 /*return*/];
        }
    });
}); };
