
# open-feature-flags

**open-feature-flags** es una librería modular desarrollada en TypeScript para gestionar **feature flags**. Su estructura sigue los principios de **Clean Architecture**, lo que garantiza la separación de responsabilidades y una fácil escalabilidad y mantenimiento. La librería permite habilitar o deshabilitar características de manera dinámica en una aplicación, mediante diferentes estrategias que pueden ser implementadas por el usuario final.

## Características principales

- **Modularidad**: Cada componente de la librería es fácilmente extensible.
- **Estrategias Personalizadas**: Implementa tus propias estrategias para habilitar o deshabilitar feature flags.
- **Providers Flexibles**: Puedes definir cómo y desde dónde cargar los feature flags (por ejemplo, desde variables de entorno, bases de datos, etc.).
- **Aplicación de Clean Architecture**: La lógica de negocio está desacoplada de las implementaciones, permitiendo un mantenimiento más sencillo y la posibilidad de agregar nuevas funcionalidades sin romper el código existente.

## Estructura de Carpetas

La estructura sigue **Clean Architecture**, organizando el proyecto en capas claras:

```
src/
├── application/
│   ├── services/
│   │   └── feature-flag-manager.service.ts
├── domain/
│   ├── entities/
│   │   └── feature-flag.entity.ts
│   ├── repositories/
│   │   ├── provider.repository.ts
│   │   └── strategy.repository.ts
│   └── providers/
│       └── provider.interface.ts
│   └── strategies/
│       ├── feature-flag.strategy.ts
├── infrastructure/
│   ├── persistence/
│   │   ├── provider.repository-impl.ts
│   │   └── strategy.repository-impl.ts
│   └── providers/
│       └── custom-provider-impl.ts
└── strategies/
    └── percentage.strategy-impl.ts
```

### Descripción de Carpetas

- **application/**: Contiene los casos de uso y servicios como `FeatureFlagManagerService`.
- **domain/**: Define las entidades y contratos (interfaces) que forman parte de la lógica de negocio. Aquí es donde se encuentran las interfaces de los repositorios y estrategias.
- **infrastructure/**: Implementaciones concretas de los repositorios y proveedores que interactúan con la infraestructura externa (como bases de datos, APIs, etc.).
- **strategies/**: Aquí se implementan estrategias personalizadas, como `PercentageStrategyImpl`.

## Instalación

Instala la librería usando **npm** o **pnpm**:

```bash
npm install open-feature-flags
```

o con **pnpm**:

```bash
pnpm add open-feature-flags
```

## Uso

### 1. Configuración del FeatureFlagManager

Para usar la librería, primero necesitas registrar tus estrategias y providers en el `FeatureFlagManagerService`:

```typescript
import { FeatureFlagManagerService } from './application/services/feature-flag-manager.service';
import { ProviderRepositoryImpl } from './infrastructure/persistence/provider.repository-impl';
import { StrategyRepositoryImpl } from './infrastructure/persistence/strategy.repository-impl';
import { CustomProviderImpl } from './infrastructure/providers/custom-provider-impl';
import { PercentageStrategyImpl } from './infrastructure/strategies/percentage.strategy-impl';

// Inicializamos los repositorios
const providerRepository = new ProviderRepositoryImpl();
const strategyRepository = new StrategyRepositoryImpl();

// Registramos los providers
providerRepository.registerProvider('custom', new CustomProviderImpl());

// Registramos las estrategias
strategyRepository.registerStrategy('percentage', new PercentageStrategyImpl());

// Inicializamos el FeatureFlagManagerService
const featureFlagManagerService = new FeatureFlagManagerService(providerRepository, strategyRepository);
```

### 2. Verificar si un feature está habilitado

Una vez configurado, puedes usar el `FeatureFlagManagerService` para verificar si una característica está habilitada:

```typescript
const context = { userId: 12345 };
const isEnabled = await featureFlagManagerService.isFeatureEnabled('custom', 'new-ui', context, [50]);
console.log(`¿La nueva UI está habilitada para el usuario 12345? ${isEnabled}`);
```

### 3. Crear tu propia estrategia

Puedes crear tus propias estrategias implementando la interfaz `FeatureFlagStrategy`:

```typescript
import { FeatureFlagStrategy } from '../domain/strategies/feature-flag.strategy';

export class CustomStrategyImpl implements FeatureFlagStrategy {
  isEnabled(context: unknown): boolean {
    // Lógica personalizada
    return true; // habilita siempre
  }
}
```

Luego registra esta estrategia en el `StrategyRepository`:

```typescript
strategyRepository.registerStrategy('custom', new CustomStrategyImpl());
```

## Pruebas

Para ejecutar las pruebas, simplemente utiliza **Jest** u otro framework de pruebas. Por ejemplo:

```bash
npm run test
```

Las pruebas se organizan de la misma manera que el código fuente, y están ubicadas en la carpeta **tests/**:

```
tests/
├── domain/
│   ├── providers/
│   │   └── provider.interface.test.ts
│   └── strategies/
│       └── percentage.strategy.test.ts
├── infrastructure/
│   ├── providers/
│   │   └── custom-provider-impl.test.ts
│   └── persistence/
│       ├── provider.repository-impl.test.ts
│       └── strategy.repository-impl.test.ts
└── application/
    └── services/
        └── feature-flag-manager.service.test.ts
```

## Contribuciones

Contribuciones, issues y solicitudes de nuevas características son bienvenidas. Si deseas contribuir:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tu feature (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva feature'`).
4. Haz push a tu rama (`git push origin feature/nueva-feature`).
5. Crea un **pull request**.

## Licencia

Este proyecto está licenciado bajo la **MIT License**.
