"use client";
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
var ui_react_1 = require("@tonconnect/ui-react");
var react_1 = require("react");
var sdk_1 = require("@tma.js/sdk");
var sdk_react_1 = require("@tma.js/sdk-react");
var Nav_1 = require("./components/BottomNav/Nav");
var Earn_1 = require("./page-components/Earn/Earn");
var HeaderTop_1 = require("./components/HeaderTop/HeaderTop");
var Friends_1 = require("./page-components/Friends/Friends");
var Tasks_1 = require("./page-components/Tasks/Tasks");
var Boost_1 = require("./page-components/Boost/Boost");
var initialUserData_1 = require("./utils/initialUserData");
var user_1 = require("@/api/user");
var setName_1 = require("@/helpers/setName");
var fomautils_1 = require("fomautils");
var task_1 = require("@/api/task");
var checkLevel_1 = require("@/helpers/checkLevel");
var image_1 = require("next/image");
var Loader_1 = require("./components/Loader/Loader");
var Airdrop_1 = require("./components/Airdrop/Airdrop");
function Home() {
    var _this = this;
    var _a, _b, _c, _d;
    var closingBehavior = sdk_1.initClosingBehavior()[0];
    closingBehavior.enableConfirmation();
    var viewport = sdk_react_1.useViewport();
    var data = sdk_react_1.useInitData(); // Destructuring initData
    var chatId = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id;
    viewport === null || viewport === void 0 ? void 0 : viewport.expand();
    var initDataRaw = sdk_react_1.retrieveLaunchParams().initDataRaw;
    var token = initDataRaw;
    var _e = react_1.useState("Earns"), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = react_1.useState(initialUserData_1.initialUserData), userData = _f[0], setUserData = _f[1];
    var balanceRef = react_1.useRef(0);
    react_1.useEffect(function () {
        window.scrollTo(0, 0);
    }, [currentPage]);
    var handleBalanceUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userData._id) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_1.updateBalance(chatId, balanceRef.current, token)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    //
    react_1.useEffect(function () {
        var intervalId = setInterval(handleBalanceUpdate, 30000);
        return function () { return clearInterval(intervalId); };
    }, [userData]);
    var walletAddress = ui_react_1.useTonAddress();
    var _g = ui_react_1.useTonConnectModal(), state = _g.state, open = _g.open, close = _g.close;
    var tonConnectUI = ui_react_1.useTonConnectUI()[0];
    var _h = react_1.useState(false), walletLoaded = _h[0], setWalletLoaded = _h[1];
    var _j = react_1.useState(""), walletErr = _j[0], setWalletErr = _j[1];
    var initWallet = react_1.useCallback(function () {
        var intervalId = setInterval(function () {
            var loader = document.querySelector(".go121314943");
            if (!loader) {
                setWalletLoaded(true);
                clearInterval(intervalId); // Clear the interval to stop it
            }
        }, 1000);
        return function () { return clearInterval(intervalId); }; // Cleanup
    }, []);
    react_1.useEffect(function () {
        initWallet();
    }, []);
    var handleWalletClick = react_1.useCallback(function () {
        if (!tonConnectUI.connected) {
            open();
        }
        else {
            tonConnectUI.disconnect();
        }
    }, []);
    var loadUser = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var loadUserRes, balanceSpan, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_1.fetchUserAccount(chatId, token)];
                case 1:
                    loadUserRes = _a.sent();
                    if (loadUserRes === null || loadUserRes === void 0 ? void 0 : loadUserRes.data) {
                        setUserData(loadUserRes.data);
                        balanceRef.current = loadUserRes.data.balance;
                        balanceSpan = document.getElementById("displayBalance");
                        if (balanceSpan) {
                            balanceSpan.innerText = "" + fomautils_1.formatNumberWithCommas(loadUserRes.data.balance);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        loadUser();
    }, []);
    //This function will only be re-initialized/re-created whenever wallet address changes
    var handleAddressChange = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var userWalletAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userWalletAddress = userData === null || userData === void 0 ? void 0 : userData.walletAddress;
                    if (!(walletAddress && userWalletAddress !== walletAddress)) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_1.updateWalletAddress(chatId, walletAddress, token)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [walletAddress]);
    react_1.useEffect(function () {
        handleAddressChange(); // Calls the function whenever it is recreated
    }, [handleAddressChange]);
    var _k = react_1.useState(null), tasks = _k[0], setTasks = _k[1];
    var loadTasks = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var loadTasksRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, task_1.fetchTasks(chatId, token)];
                case 1:
                    loadTasksRes = _a.sent();
                    if (loadTasksRes === null || loadTasksRes === void 0 ? void 0 : loadTasksRes.data) {
                        setTasks(loadTasksRes.data);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        loadTasks();
    }, []);
    react_1.useEffect(function () {
        var _a;
        //Check for level updates
        var isUpdateNeeded = checkLevel_1.checkLevel(balanceRef.current, (_a = userData === null || userData === void 0 ? void 0 : userData.level) === null || _a === void 0 ? void 0 : _a.levelCount);
        if (isUpdateNeeded.levelUpdateNeeded) {
            setUserData(function (prev) { return (__assign(__assign({}, prev), { level: isUpdateNeeded.newLevelData })); });
        }
    }, [balanceRef.current]);
    return (React.createElement("main", { className: "w-full h-[100vh] relative" },
        React.createElement(ui_react_1.TonConnectButton, { className: "hidden" }),
        userData._id && (React.createElement(React.Fragment, null,
            React.createElement(HeaderTop_1["default"], { hide: currentPage == "Friends" || currentPage == "Tasks" || currentPage == "Airdrop", nickname: (_b = userData === null || userData === void 0 ? void 0 : userData.level) === null || _b === void 0 ? void 0 : _b.levelNickname, name: setName_1.setName(userData), avatar: userData.avatar, balance: balanceRef.current, handleWalletClick: handleWalletClick, tonConnectUI: tonConnectUI, walletAddress: walletAddress, walletLoaded: walletLoaded }),
            currentPage === "Friends" && (React.createElement(Friends_1["default"], { friends: userData.referrals, chatId: chatId, token: token, setUserData: setUserData })),
            currentPage === "Earns" && (React.createElement(React.Fragment, null, ((_c = userData === null || userData === void 0 ? void 0 : userData.level) === null || _c === void 0 ? void 0 : _c.levelCount) && (React.createElement(Earn_1["default"], { multitapActive: userData.multitap, balanceRef: balanceRef, setUserData: setUserData, level: (_d = userData === null || userData === void 0 ? void 0 : userData.level) === null || _d === void 0 ? void 0 : _d.levelCount, highestBoosterBought: userData.booster4
                    ? 4
                    : userData.booster3
                        ? 3
                        : userData.booster2
                            ? 2
                            : null })))),
            currentPage == "Airdrop" && (React.createElement(Airdrop_1["default"], null)),
            currentPage === "Tasks" && (React.createElement(Tasks_1["default"], { lastClaimTime: userData.lastDailyLoginClaimTime, balance: balanceRef, token: token, chatId: chatId, setUserData: setUserData, tasks: tasks, ongoingTasks: userData.ongoingTasks, completedTasks: userData.completedTasks })),
            currentPage === "Boost" && (React.createElement(Boost_1["default"], { chatId: chatId, multitapActive: userData.multitap, booster2Active: userData.booster2, booster3Active: userData.booster3, booster4Active: userData.booster4, token: token, balanceRef: balanceRef, setUserData: setUserData })),
            React.createElement(Nav_1["default"], { currentPage: currentPage, setCurrentPage: setCurrentPage }))),
        !userData._id && (React.createElement("section", { className: "w-full h-full relative" },
            React.createElement("figure", { className: "relative w-full h-full" },
                React.createElement(image_1["default"], { src: "/assets/images/loader.jpg", alt: "Loader image", fill: true })),
            React.createElement("section", { className: "absolute top-0 left-0 flex justify-center items-center w-full h-full" },
                React.createElement("section", { className: "mt-[400px] bg-[#0f0e39f1] rounded-[50%] w-[45vw] h-[45vw] flex justify-center items-center" },
                    React.createElement(Loader_1["default"], null)))))));
}
exports["default"] = Home;
