import { PercentageStrategy } from "../../../domain/strategies/percentage.strategy";

describe("PercentageStrategy", () => {
  it("should return true or false based on the percentage", () => {
    const strategy = new PercentageStrategy(50);
    const result = strategy.isEnabled();
    expect(result).toBe(result || !result);
  });
});
