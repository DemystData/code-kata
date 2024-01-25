import { randomUUID } from "crypto";
import { beforeAll, expect, it, vi } from "vitest";
import { event } from "../test/setup";
import { createTable } from "../test/table";
import { handler as create } from "./initiate";

const ctx = {} as any;
const cb = vi.fn();

it("insert customer data", async () => {
  const input = {
    id: randomUUID(),
    companyName: "loan",
    accountingProvider: "Myob",
  };

  const data = await create(event(input.id, input), ctx, cb);

  expect(data).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });
});
