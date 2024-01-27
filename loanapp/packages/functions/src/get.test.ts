import { randomUUID } from "crypto";
import { beforeAll, expect, it, vi } from "vitest";
import { event } from "../test/setup";
import { createTable } from "../test/table";
import { handler } from "./get";
import { handler as create } from "./initiate";



const ctx = {} as any;
const cb = vi.fn();

it("return with status code 404", async () => {
  const data = await handler(event(randomUUID(), {}), ctx, cb);

  expect(data).toEqual({ statusCode: 200, body: JSON.stringify({ assets:[] }) });
});

it("gets the customer data", async () => {
  const input = {
    id: randomUUID(),
    companyName: "loan",
    accountingProvider: "Myob",
  };

  await create(event(input.id, input), ctx, cb);

  const getData = await handler(event(input.id, {}), ctx, cb);

  expect(getData).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });
});
