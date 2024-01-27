export const updateExpression = (input: Record<string, unknown>) => {
  let expression = "set";
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {};

  for (const property in input) {
    expression += ` #${property} = :${property} ,`;
    names["#" + property] = property;
    values[":" + property] = input[property];
  }

  expression = expression.slice(0, -1);

  return { expression, names, values };
};
