const schema = require("../src/schema");

it("creates a schema for Wye", () => {
  expect(schema).toMatchSnapshot();
});
