
export class StrategyRegistry {
    private strategies: { [key: string]: new (...args: any[]) => StrategyRegistry } = {};

    registerStrategy(name: string, strategy: new (...args: any[]) => StrategyRegistry): void {
        this.strategies[name] = strategy;
    }

    getStrategy(name: string, ...args: unknown[]): StrategyRegistry {
        const StrategyClass = this.strategies[name];
        if (!StrategyClass) {
            throw new Error(`Strategy ${name} is not registered.`);
        }
        return new StrategyClass(...args);
    }
}