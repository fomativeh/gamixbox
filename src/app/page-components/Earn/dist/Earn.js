"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
require("./Earn.css");
var fomautils_1 = require("fomautils");
var Earn = function (_a) {
    var balanceRef = _a.balanceRef, level = _a.level, setUserData = _a.setUserData, highestBoosterBought = _a.highestBoosterBought, multitapActive = _a.multitapActive;
    var _b = react_1.useState(false), isPressed = _b[0], setIsPressed = _b[1];
    var _c = react_1.useState([]), tapEffects = _c[0], setTapEffects = _c[1];
    var _d = react_1.useState(0), tapId = _d[0], setTapId = _d[1];
    // Detect if the device is touch-enabled
    var isTouchDevice = "ontouchstart" in window;
    var handleIncrement = function (tapCount) {
        var incrementAmount = highestBoosterBought || 1;
        var totalIncrement = incrementAmount * tapCount;
        balanceRef.current += totalIncrement;
        var balanceSpan = document.getElementById("displayBalance");
        if (balanceSpan) {
            balanceSpan.innerText = "" + fomautils_1.formatNumberWithCommas(balanceRef.current);
        }
        setIsPressed(true);
        setTimeout(function () { return setIsPressed(false); }, 50);
    };
    var handleTouchOrClick = function (e) {
        // Determine the number of taps based on multitap and the number of touches
        var tapCount = multitapActive && "touches" in e ? e.touches.length : 1;
        handleIncrement(tapCount);
        // For each finger/tap, create a separate tap effect at the coordinates
        var incrementAmount = highestBoosterBought || 1;
        var newTapEffects = [];
        for (var i = 0; i < tapCount; i++) {
            var x = "touches" in e ? e.touches[i].pageX : e.pageX;
            var y = "touches" in e ? e.touches[i].pageY : e.pageY;
            newTapEffects.push({ id: tapId + i, x: x, y: y, amount: incrementAmount });
        }
        setTapEffects(function (prev) { return __spreadArrays(prev, newTapEffects); });
        setTapId(function (prev) { return prev + tapCount; });
    };
    react_1.useEffect(function () {
        // Remove the oldest tap effect after the animation duration
        var timer = setTimeout(function () {
            setTapEffects(function (effects) { return effects.slice(1); }); // Removes the first (oldest) effect
        }, 1700);
        return function () { return clearTimeout(timer); };
    }, [tapEffects]);
    return (react_1["default"].createElement("section", { className: "w-full h-[100vh] flex flex-col justify-center items-center" },
        react_1["default"].createElement("section", { className: "relative w-full h-full flex justify-center items-center" },
            react_1["default"].createElement("figure", { className: "w-full h-full max-w-[400px] max-h-[400px] relative" },
                react_1["default"].createElement("img", { src: "/assets/images/blur-" + level + ".svg", alt: "Blur image", className: "w-full h-full" })),
            react_1["default"].createElement("section", { className: "w-full h-full flex justify-center items-center absolute top-0 left-0" },
                react_1["default"].createElement("div", { className: "w-[250px] h-[250px] relative" },
                    react_1["default"].createElement("img", { onClick: !isTouchDevice ? handleTouchOrClick : undefined, onTouchStart: isTouchDevice ? handleTouchOrClick : undefined, src: "/assets/images/level-" + level + ".svg", alt: "Coin image", className: "w-full h-full coin " + (isPressed ? "pressed" : "") }))),
            tapEffects.map(function (effect) { return (react_1["default"].createElement("span", { key: effect.id, className: "tap-effect text-white font-semibold absolute z-10", style: {
                    top: effect.y + "px",
                    left: effect.x + "px"
                } },
                "+",
                fomautils_1.formatNumberWithCommas(effect.amount))); }))));
};
exports["default"] = Earn;
