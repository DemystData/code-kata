"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceSheetModule = void 0;
const common_1 = require("@nestjs/common");
const balance_sheet_service_1 = require("./balance-sheet.service");
const balance_sheet_controller_1 = require("./balance-sheet.controller");
let BalanceSheetModule = class BalanceSheetModule {
};
exports.BalanceSheetModule = BalanceSheetModule;
exports.BalanceSheetModule = BalanceSheetModule = __decorate([
    (0, common_1.Module)({
        controllers: [balance_sheet_controller_1.BalanceSheetController],
        providers: [balance_sheet_service_1.BalanceSheetService],
    })
], BalanceSheetModule);
//# sourceMappingURL=balance-sheet.module.js.map