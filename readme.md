
# open-feature-flags

[![npm version](https://badge.fury.io/js/open-feature-flags.svg)](https://badge.fury.io/js/open-feature-flags)

A flexible TypeScript library for managing **feature flags** with support for custom **providers** and **strategies**. This library allows you to create, manage, and evaluate feature flags dynamically, offering integration with various data sources (providers) such as Firebase, MongoDB, or environment variables, and custom activation strategies.

### Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [How it works](#how-it-works)
    - [Providers](#providers)
    - [Strategies](#strategies)
- [Usage](#usage)
    - [Registering Providers](#registering-providers)
    - [Adding Custom Strategies](#adding-custom-strategies)
    - [Example with Firebase](#example-with-firebase)
- [Use Cases](#use-cases)
    - [Feature Toggles for A/B Testing](#feature-toggles-for-ab-testing)
    - [Rolling out new features gradually](#rolling-out-new-features-gradually)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **open-feature-flags** library is designed to provide a flexible, modular, and easy-to-use system for managing feature flags in your applications. Feature flags allow you to control the visibility of features in your software based on dynamic rules or configurations. This makes it easier to perform A/B testing, gradual rollouts, and customized user experiences without needing to deploy new code constantly.

This library supports:
- **Custom Providers**: Feature flags can be loaded from various data sources such as Firebase, MongoDB, or even environment variables.
- **Custom Strategies**: Define strategies that determine when a feature flag is enabled or disabled. For example, you can base the feature flag on user groups, percentages, or any custom logic.

## Installation

To install the **open-feature-flags** library, run:

```bash
npm install open-feature-flags
```

or using `pnpm`:

```bash
pnpm add open-feature-flags
```

## How it works

### Providers

Providers are responsible for loading the feature flags from a data source, such as a database, API, or environment variables. These flags are then evaluated using the strategy assigned to them.

A provider needs to implement the following interface:

```typescript
export interface CustomProvider {
    loadFeatureFlags(): Promise<FeatureFlag[]>;
}
```

You can register multiple providers and switch between them at runtime.

### Strategies

A strategy defines the logic to determine whether a feature is enabled or disabled for a given context (like a user, a session, or any other piece of data).

Here's a simple example of a percentage-based strategy:

```typescript
import { FeatureFlagStrategy } from 'open-feature-flags';

export class FeatureFlagStrategy implements FeatureFlagStrategy {
    private readonly percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage;
    }

    isEnabled(userContext: any): boolean {
        const userIdHash = userContext.userId % 100;
        return userIdHash < this.percentage;
    }
}
```

## Usage

### Registering Providers

First, you need to register the providers that will load your feature flags. For example, you can create a Firebase-based provider:

```typescript
import { FirebaseFeatureFlagProvider } from './providers/firebase-feature-flag.provider';
import { ProviderRegistry } from 'open-feature-flags';

const providerRegistry = new ProviderRegistry();

// Register Firebase provider
providerRegistry.registerProvider('firebase', new FirebaseFeatureFlagProvider(firestore));
```

### Adding Custom Strategies

You can also register strategies to handle different conditions for enabling or disabling flags. For example, the `FeatureFlagStrategy` can activate a feature flag for a specific percentage of users.

```typescript
import { StrategyRegistry } from 'open-feature-flags';
import { FeatureFlagStrategy } from './strategies/percentage.strategy';

const strategyRegistry = new StrategyRegistry();

// Register percentage strategy
strategyRegistry.registerStrategy('percentage', FeatureFlagStrategy);
```

### Example with Firebase

```typescript
import { FeatureFlagManagerService, ProviderRegistry, StrategyRegistry } from 'open-feature-flags';
import { FirebaseFeatureFlagProvider } from './providers/firebase-feature-flag.provider';
import { FeatureFlagStrategy } from './strategies/percentage.strategy';

// Initialize Firestore
const firestore = firebase.firestore();

// Initialize registries
const providerRegistry = new ProviderRegistry();
const strategyRegistry = new StrategyRegistry();

// Register providers and strategies
providerRegistry.registerProvider('firebase', new FirebaseFeatureFlagProvider(firestore));
strategyRegistry.registerStrategy('percentage', FeatureFlagStrategy);

// Initialize feature flag manager
const featureFlagManager = new FeatureFlagManagerService(providerRegistry, strategyRegistry);

// Check if a feature is enabled
const isFeatureEnabled = await featureFlagManager.isFeatureEnabled('firebase', 'new-ui', { userId: 123 });
console.log(`Is New UI Enabled? ${isFeatureEnabled}`);
```

## Use Cases

### Feature Toggles for A/B Testing

One of the most common uses of feature flags is to perform **A/B testing**. You can show a new feature only to a subset of users, and measure the results before rolling it out to everyone.

```typescript
const isExperimentEnabled = await featureFlagManager.isFeatureEnabled('firebase', 'experiment', { userId: 123 });
```

### Rolling out new features gradually

You can use strategies like `FeatureFlagStrategy` to gradually roll out new features. For example, you could enable a new UI for 20% of your users initially and increase the percentage over time.

```typescript
const isNewFeatureEnabled = await featureFlagManager.isFeatureEnabled('firebase', 'new-ui', { userId: 567 });
```

## API

### `FeatureFlagManagerService`

Manages the lifecycle of feature flags, allowing you to check if a feature is enabled.

- **`isFeatureEnabled(providerName: string, featureName: string, userContext: any): Promise<boolean>`**: Returns `true` if the feature is enabled, based on the registered providers and strategies.

### `ProviderRegistry`

Manages the list of providers from which feature flags are loaded.

- **`registerProvider(name: string, provider: CustomProvider): void`**: Registers a new provider.
- **`loadFeatureFlags(providerName: string): Promise<FeatureFlag[]>`**: Loads feature flags from the specified provider.

### `StrategyRegistry`

Manages the strategies used to evaluate feature flags.

- **`registerStrategy(name: string, strategy: new (...args: any[]) => FeatureFlagStrategy): void`**: Registers a new strategy.
- **`getStrategy(name: string, ...args: any[]): FeatureFlagStrategy`**: Returns the registered strategy.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/antonygiomarxdev/open-feature-flags/issues) to report any bug or request new features.

### How to contribute:
1. Fork the project.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.
