import { StrategyRepository } from "../../domain/repositories/strategy.repository";
import { FeatureFlagStrategy } from "../../domain/strategies/feature-flag.strategy";

export class StrategyRepositoryImpl implements StrategyRepository {
  private strategies: { [key: string]: FeatureFlagStrategy } = {};

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
