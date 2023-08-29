"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBalanceSheetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_balance_sheet_dto_1 = require("./create-balance-sheet.dto");
class UpdateBalanceSheetDto extends (0, swagger_1.PartialType)(create_balance_sheet_dto_1.CreateBalanceSheetDto) {
}
exports.UpdateBalanceSheetDto = UpdateBalanceSheetDto;
//# sourceMappingURL=update-balance-sheet.dto.js.map