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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceSheetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BalanceSheetService = class BalanceSheetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createBalanceSheetDto) {
        return this.prisma.balance_sheet.create({ data: createBalanceSheetDto });
    }
    async getFromAccountingSoftware(id) {
        return await this.prisma.balance_sheet.findMany({ where: { company_id: id } });
    }
    getValue(balance_sheet) {
        let count = 0;
        let profitOrLossSummary = 0, totalAssetValue = 0;
        for (const item of balance_sheet) {
            profitOrLossSummary += item.profitOrLoss;
            totalAssetValue += item.assetsValue;
            count++;
            if (count == 12)
                return [profitOrLossSummary, totalAssetValue];
        }
    }
    async getFromDecisionEngine(getFromDecisionEngineDto) {
        let balance_sheet = await this.prisma.balance_sheet.findMany({ where: { company_id: getFromDecisionEngineDto.account_provider },
            orderBy: [{
                    year: 'desc'
                }, {
                    month: 'desc'
                }] });
        let result = this.getValue(balance_sheet);
        return result;
    }
};
exports.BalanceSheetService = BalanceSheetService;
exports.BalanceSheetService = BalanceSheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BalanceSheetService);
//# sourceMappingURL=balance-sheet.service.js.map