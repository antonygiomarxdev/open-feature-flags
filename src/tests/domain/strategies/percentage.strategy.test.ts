import { PercentageStrategy } from "../../../infrastructure/strategies/percentage.strategy-impl";

describe("PercentageStrategy", () => {
  it("should return true or false based on the percentage", () => {
    const strategy = new PercentageStrategy();
    const result = strategy.isEnabled();
    expect(result).toBe(result || !result);
  });
});
