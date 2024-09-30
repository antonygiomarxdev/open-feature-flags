import { PercentageStrategy } from "../../../domain/strategies/percentage.strategy";

describe("PercentageStrategy", () => {
  it("should return true when userId hash is less than the percentage", () => {
    const strategy = new PercentageStrategy(50);
    const userContext = { userId: 25 };
    expect(strategy.isEnabled(userContext)).toBe(true);
  });

  it("should return false when userId hash is greater than or equal to the percentage", () => {
    const strategy = new PercentageStrategy(50);
    const userContext = { userId: 75 };
    expect(strategy.isEnabled(userContext)).toBe(false);
  });
});
