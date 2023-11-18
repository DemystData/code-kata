-- CreateTable
CREATE TABLE "balance_sheet" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "profitOrLoss" INTEGER NOT NULL,
    "assetsValue" INTEGER NOT NULL,

    CONSTRAINT "balance_sheet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "balance_sheet" ADD CONSTRAINT "balance_sheet_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
