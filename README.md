# CalendarOfMonthlyStatistics

## Getting Started

Before you start with the project make sure that you have angular-cli installed on your computer.

### Installing

Install all the dependencies

```
yarn/npm install
```

You can use command tool

```
npm start
```

End with an example of getting some data out of the system or using it for a little demo

## CI / CD

To be configured

## Environments

Environment 

## Versioning

New version of the app should be released when the whole scope of features are done and tested.
For new version of the app **release** branch should be created. For example, for version 2.0.0 branch **release/2.0.0** should be created.

## GIT

We use GitFlow for Version Control management.
All of branches should be named like "feature/{Backlog item ID}-\${Backlog item title}".
All the bug fixes should be merged directly in release branch.

Once feature or bug fix completed Pull Request should be created.

## Development guidelines

### Application architecture

```
<-- root -->
  -- assets
     -- icons
     -- img
  -- core
     -- actions
     -- components
     -- interfaces
     -- configurations [dev / prod configurations]
     -- reducers
     -- selectors
     -- thunks
  -- modules
  app.tsx
```

### Data-management

We use Redux as data-management ecosystem.

---

Actions file should contain action types enum named like "<module-name>ActionTypes". Each property of this enum should have prefix "<module-name>".
Example:

```
export enum AuthorizationActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] LoginSuccess',
  LoginFailed = '[Auth] LoginFailed',
  LogOut = '[Auth] LogOut',
}
```

Action creators and reducers should be handled using **redux-actions**.
Redux-thunk is used to handle side-effects.

### Typescript

**Everything** in the app should be covered by interface. If "any" can be covered by interface -> it **MUST BE** replaced.

### Component folder

If developer wants to create new component, it should be implemented in the next way.
Separate folder for each component needs to be created.

.tsx file which will contain component class or function should be named the same as folder name.
Component name **shouldn't** include "Component". For example, if developer wants to create a component named Drawer, component class / function should be named without "Component".
**Use "export" only to export a component**. Don't do default export for separate component.
Please define component using arrow function. Don't use __function__ declaration.

If component required additional types to be defined which will not be used anywhere else -> create **types.ts** file and define it there.
All of styles also should be covered in separate file **styles.ts**.
If component required some other components to be created which will not be used in other components -> components folder should be created inside of current component folder.

## Application constants

Constants that can be reused should be declared in separate file using Typescript enum feature. For example, for Local Storage constants, please create file constants/local-storage.ts. Inside of this file create enum like this

```
export enum LocalStorage {
  UserToken = '[LocalStorage] UserToken',
}
```

Do the same for style constants: colors, paddings etc.

## Before you send your changes to review

Please make sure that you covered data by types
Make sure that you deleted all the console.logs
Make sure that application will work fine for different screen sizes
Make sure that functionality you developed are working properly


// Kq1rJI0SjhWd6F7MpjVoNkqpfZw1