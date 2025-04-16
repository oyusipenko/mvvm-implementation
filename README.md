# Books Management Application

A React application for managing a collection of books, built with clean architecture principles and modern web development practices.

## Architecture

This application follows the **Model-View-Presenter (MVP)** pattern, which provides clear separation of concerns and makes the codebase more maintainable and testable:

- **View**: Responsible solely for rendering the UI and capturing user interactions
- **Controller (Presenter)**: Handles business logic and user actions from the Views
- **Store**: Manages application state using MobX for reactivity
- **Repository**: Abstracts data access operations from the controllers
- **Services/Gateways**: Handle communication with external systems (API)
- **Models**: Define the domain entities and data structures

## Key Features

- Clean separation between UI and business logic
- Reactive state management with MobX
- Comprehensive test coverage for business logic
- Asynchronous API communication through repository pattern

## Project Structure

```
src/
├── controllers/     # Business logic handlers
├── models/          # Domain entities
├── repositories/    # Data access layer
├── services/        # External services integration
├── stores/          # MobX state management
└── views/           # React components (UI only)
```

## Technologies

- **React**: UI library
- **MobX**: State management
- **MobX-React**: React bindings for MobX
- **Jest**: Testing framework

## Implementation Details

### Reactivity

The application uses MobX for state management, with stores containing observable state that automatically triggers UI updates when modified. The controllers manipulate this state through actions, ensuring a unidirectional data flow.

### Controllers

Controllers separate business logic from UI components. They:
- Handle user actions from the view
- Communicate with repositories to fetch or modify data
- Update the application state in the stores

### Repository Pattern

The repository pattern abstracts data access operations, allowing for:
- Clean separation between data sources and business logic
- Easier mocking for tests
- Flexibility to change data sources without affecting business logic

### Testing Strategy

The architecture enables thorough testing of business logic without coupling to UI components. Tests focus on:
- Controllers: Business logic verification
- Repositories: Data transformation and communication
- Stores: State management

## Best Practices Implemented

- **Single Responsibility Principle**: Each class has a single responsibility
- **Dependency Injection**: Dependencies are provided to classes rather than created internally
- **Immutable State**: State is treated as immutable and only modified through actions
- **Async Operations Handling**: Proper error handling and loading states for asynchronous operations
- **Optimized Rendering**: Using MobX's `runInAction` to batch updates and prevent unnecessary renders