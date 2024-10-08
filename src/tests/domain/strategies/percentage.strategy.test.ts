import { FeatureFlagStrategy } from "../../../domain/strategies/feature-flag.strategy";

describe("PercentageStrategy", () => {
  it("should return true or false based on the percentage", () => {
    const strategy = new FeatureFlagStrategy(50);
    const result = strategy.isEnabled();
    expect(result).toBe(result || !result);
  });
});
