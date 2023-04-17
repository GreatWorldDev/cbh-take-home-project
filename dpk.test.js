const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Uses the provided partition key if it exists", () => {
    const event = { partitionKey: "myPartitionKey" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe("myPartitionKey");
  });

  it("Hashes the event data if no partition key is provided", () => {
    const event = { data: "myData" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toMatch(/^[0-9a-f]{128}$/i);
  });

  it("Stringifies non-string partition keys", () => {
    const event = { partitionKey: { myKey: "myValue" } };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe('{"myKey":"myValue"}');
  });

  it("Truncates partition keys that are too long", () => {
    const longKey = "a".repeat(300);
    const event = { partitionKey: longKey };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });
  
  it("Hashes partition keys that are too long and also non-string", () => {
    const longObject = { myKey: "a".repeat(300) };
    const event = { partitionKey: longObject };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toMatch(/^[0-9a-f]{128}$/i);
  });
});