import { FeatureFlagStrategy } from "../../domain";

export class PercentageStrategy implements FeatureFlagStrategy {
  isEnabled(): boolean {
    return Math.random() < 0.5;
  }
}
