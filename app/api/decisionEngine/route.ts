import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    if (!requestData) {
      return NextResponse.json({
        error: "Company Details not received",
        balanceSheet: null,
      });
    }

    return NextResponse.json({
      message: "Company Details received",
      decisionEngineData: requestData,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, decisionEngineData: null });
  }
}
