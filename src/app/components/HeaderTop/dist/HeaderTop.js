"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var formatLevels_1 = require("@/helpers/formatLevels");
var checkLevel_1 = require("@/helpers/checkLevel");
var LevelsModal = function (_a) {
    var setLevelsModalOpen = _a.setLevelsModalOpen;
    var allLevels = formatLevels_1.formatLevels(checkLevel_1.levels);
    return (react_1["default"].createElement("section", { className: "absolute top-0 left-0 w-full min-h-[100vh] bg-[#0c0520ce] z-[9]" },
        react_1["default"].createElement("section", { className: "w-full h-full flex flex-col overflow-y-scroll justify-start items-center py-[30px] px-[5px] relative" },
            react_1["default"].createElement("span", { onClick: function () { return setLevelsModalOpen(false); }, className: "absolute top-[25px] right-[20px] w-[40px] text-[19px] h-[40px] flex justify-center items-center bg-light_blue_1 text-[white] rounded-[50px]" }, "x"),
            react_1["default"].createElement("figure", { className: "w-[130px] min-h-[130px] relative mt-[20px]" },
                react_1["default"].createElement(image_1["default"], { src: "/assets/icons/trophy.svg", alt: "Trophy icon", fill: true })),
            react_1["default"].createElement("section", { className: "mt-[30px] w-full flex flex-col justify-start items-center" }, allLevels.map(function (each, i) {
                return (react_1["default"].createElement("section", { key: i, className: "blur-bg w-full flex justify-between items-center rounded-[30px] h-[37px] my-[5px]" },
                    react_1["default"].createElement("span", { className: "h-full text-[12px]  px-[12px]   flex justify-center items-center rounded-[inherit] bg-light_blue_1 text-[white]" },
                        "Level ",
                        each.level),
                    react_1["default"].createElement("span", { className: "text-[white]" }, each.balanceRange),
                    react_1["default"].createElement("span", { className: "h-full text-[12px] px-[12px]   flex justify-center items-center  rounded-[inherit] bg-[white] text-[#7070FF]" }, each.nickname)));
            })))));
};
var HeaderTop = function (_a) {
    var avatar = _a.avatar, handleWalletClick = _a.handleWalletClick, name = _a.name, walletLoaded = _a.walletLoaded, tonConnectUI = _a.tonConnectUI, walletAddress = _a.walletAddress, balance = _a.balance, nickname = _a.nickname, hide = _a.hide;
    var handleButtonClick = function () {
        if (walletLoaded) {
            handleWalletClick();
        }
    };
    var _b = react_1.useState(false), levelsModalOpen = _b[0], setLevelsModalOpen = _b[1];
    return (react_1["default"].createElement("header", { className: (hide && "hidden") + " z-[99] w-full fixed top-0 left-0 text-[white] flex flex-col justify-center items-center font-[Lexend]" },
        levelsModalOpen && react_1["default"].createElement(LevelsModal, { setLevelsModalOpen: setLevelsModalOpen }),
        react_1["default"].createElement("section", { className: "bg-dark_blue_1 header w-full flex flex-col justify-center items-center max-w-[500px] p-[20px] rounded-b-[30px] z-[2] border-b-[3px] border-b-light_blue_1" },
            react_1["default"].createElement("section", { className: "w-full flex justify-between items-center" },
                react_1["default"].createElement("section", { className: "flex justify-start items-center" },
                    react_1["default"].createElement("figure", { className: "w-[40px] h-[40px] relative mr-[10px] rounded-[50px]" },
                        react_1["default"].createElement(image_1["default"], { src: avatar ? avatar : "/assets/images/avatar.svg", alt: "Avatar image", className: "rounded-[inherit]", fill: true })),
                    react_1["default"].createElement("span", { className: "font-semibold" }, (name === null || name === void 0 ? void 0 : name.length) > 14 ? name === null || name === void 0 ? void 0 : name.slice(0, 14) : name)),
                react_1["default"].createElement("button", { onClick: handleButtonClick, className: "blur-bg py-[10px] px-[12px] rounded-[50px] flex justify-center items-center" },
                    walletLoaded && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("figure", { className: "w-[25px] h-[25px] relative mr-[5px] rounded-[50px]" },
                            react_1["default"].createElement(image_1["default"], { src: "/assets/icons/wallet.svg", alt: "Avatar image", className: "rounded-[inherit]", fill: true })),
                        react_1["default"].createElement("span", { className: "font-semibold text-[12px]" }, tonConnectUI.connected ? (react_1["default"].createElement(react_1["default"].Fragment, null, walletAddress.slice(0, 3) +
                            "..." +
                            walletAddress.slice(walletAddress.length - 4, walletAddress.length - 1))) : (react_1["default"].createElement(react_1["default"].Fragment, null, "Connect Wallet"))))),
                    !walletLoaded && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("figure", { className: "w-[25px] h-[25px] relative mr-[5px] rounded-[50px]" },
                            react_1["default"].createElement(image_1["default"], { src: "/assets/icons/wallet.svg", alt: "Avatar image", className: "rounded-[inherit]", fill: true })),
                        react_1["default"].createElement("div", { className: "loader-2" }))))),
            react_1["default"].createElement("section", { className: "w-full mt-[20px] blur-bg rounded-[50px] flex justify-between py-[10px] items-center px-[30px] relative" },
                react_1["default"].createElement("section", { className: "flex justify-start items-center" },
                    react_1["default"].createElement("figure", { className: "w-[35px] h-[35px] relative mr-[5px]" },
                        react_1["default"].createElement(image_1["default"], { src: "/assets/icons/Earns.svg", alt: "Earn icon", fill: true })),
                    react_1["default"].createElement("span", { className: "font-semibold", id: "displayBalance" })),
                react_1["default"].createElement("div", { className: "w-full h-full top-0 left-0 absolute flex justify-center items-center " },
                    react_1["default"].createElement("div", { className: "h-[30px] blur-bg w-[1px]" })),
                react_1["default"].createElement("section", { className: "flex justify-start items-center z-[999]", onClick: function () { return setLevelsModalOpen(true); } },
                    react_1["default"].createElement("figure", { className: "w-[20px] h-[20px] relative mr-[10px]" },
                        react_1["default"].createElement(image_1["default"], { src: "/assets/icons/trophy.svg", alt: "Trophy icon", fill: true })),
                    react_1["default"].createElement("span", { className: "max-w-[100px] break-words font-semibold" }, nickname))))));
};
exports["default"] = HeaderTop;
