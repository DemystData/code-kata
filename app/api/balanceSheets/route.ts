import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

// Define the path to your JSON file
const filePath = path.join(process.cwd(), "data", "balanceSheets.json");

export async function POST(req: Request) {
  try {
    const requestData = await req.json();
    let companyName = requestData.company;

    let balanceSheetJson = await fs.promises.readFile(filePath, "utf-8");
    let balanceSheet = await JSON.parse(balanceSheetJson).Companies;

    const companyBalanceSheet = balanceSheet.find(
      (company: any) => company.Company === companyName
    );

    if (!companyBalanceSheet) {
      return NextResponse.json({
        error: "Balance sheet not found",
        balanceSheet: null,
      });
    }

    return NextResponse.json({
      message: "Balance sheet found",
      balanceSheet: companyBalanceSheet,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, balanceSheet: null });
  }
}
