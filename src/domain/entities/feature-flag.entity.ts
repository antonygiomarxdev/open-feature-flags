export interface FeatureFlag {
  name: string;
  enabled: boolean;
  provider: string;
}

export interface FeatureFlagStrategy {
  isEnabled<T>(userContext?: T): boolean;
}
