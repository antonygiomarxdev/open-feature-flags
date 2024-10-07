export interface FeatureFlagStrategy {
  isEnabled(context: unknown, ...params: unknown[]): boolean;
}
