import { randomUUID } from "crypto";
import { beforeAll, expect, it, vi } from "vitest";
import { event } from "../test/setup";
import { createTable } from "../test/table";
import { handler as create } from "./initiate";
import { handler as update } from "./update";

beforeAll(() => {
  createTable("loan");
});

const ctx = {} as any;
const cb = vi.fn();

it("update loan data", async () => {
  const input = {
    id: randomUUID(),
    companyName: "loan",
    accountingProvider: "Myob",
  };

  await create(event(input.id, input), ctx, cb);

  const updateInput = {
    loanAmount: 500,
  };

  const updatedData = await update(event(input.id, updateInput), ctx, cb);

  expect(updatedData).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });
});
