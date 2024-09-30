import { FeatureFlagStrategy } from "../entities/feature-flag.entity";

export class PercentageStrategy implements FeatureFlagStrategy {
  private readonly percentage: number;

  constructor(percentage: number) {
    this.percentage = percentage;
  }

  isEnabled(): boolean {
    return Math.random() * 100 < this.percentage;
  }
}
