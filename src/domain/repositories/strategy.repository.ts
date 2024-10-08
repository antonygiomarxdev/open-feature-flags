import { FeatureFlagStrategy } from "../strategies/feature-flag.strategy";

export interface StrategyRepository {
  registerStrategy(name: string, strategy: FeatureFlagStrategy): void;
  getStrategy(name: string): FeatureFlagStrategy;
}
