"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceSheetController = void 0;
const common_1 = require("@nestjs/common");
const balance_sheet_service_1 = require("./balance-sheet.service");
const create_balance_sheet_dto_1 = require("./dto/create-balance-sheet.dto");
const swagger_1 = require("@nestjs/swagger");
let BalanceSheetController = class BalanceSheetController {
    constructor(balanceSheetService) {
        this.balanceSheetService = balanceSheetService;
    }
    create(createBalanceSheetDto) {
        return this.balanceSheetService.create(createBalanceSheetDto);
    }
    getFromAccountingSoftware(id) {
        return this.balanceSheetService.getFromAccountingSoftware(+id);
    }
};
exports.BalanceSheetController = BalanceSheetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_sheet_dto_1.CreateBalanceSheetDto]),
    __metadata("design:returntype", void 0)
], BalanceSheetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BalanceSheetController.prototype, "getFromAccountingSoftware", null);
exports.BalanceSheetController = BalanceSheetController = __decorate([
    (0, swagger_1.ApiTags)('Balance Sheet'),
    (0, common_1.Controller)('balance-sheet'),
    __metadata("design:paramtypes", [balance_sheet_service_1.BalanceSheetService])
], BalanceSheetController);
//# sourceMappingURL=balance-sheet.controller.js.map