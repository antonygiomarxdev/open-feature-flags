import { FeatureFlagStrategy } from "../../domain/strategies/feature-flag.strategy";

export class PercentageStrategy implements FeatureFlagStrategy {
  isEnabled(): boolean {
    return Math.random() < 0.5;
  }
}
