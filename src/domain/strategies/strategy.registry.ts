import { FeatureFlagStrategy } from "../entities/feature-flag.entity";

export class StrategyRegistry {
  private strategies: Record<string, FeatureFlagStrategy> = {};

  registerStrategy(name: string, strategy: FeatureFlagStrategy): void {
    this.strategies[name] = strategy;
  }

  getStrategy(name: string): FeatureFlagStrategy {
    const strategy = this.strategies[name];

    if (!strategy) {
      throw new Error(`Strategy ${name} is not registered.`);
    }

    return strategy;
  }
}
