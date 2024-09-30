export interface FeatureFlag {
    name: string;
    enabled: boolean;
    strategyType: string;
    strategyParams: Record<string, unknown>[]
}

export interface FeatureFlagStrategy {
    isEnabled<T>(userContext?: T): boolean;
}