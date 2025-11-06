# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDeclineMessagesForCategory*](#getdeclinemessagesforcategory)
  - [*ListCategories*](#listcategories)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateDeclineMessage*](#updatedeclinemessage)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDeclineMessagesForCategory
You can execute the `GetDeclineMessagesForCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDeclineMessagesForCategory(vars: GetDeclineMessagesForCategoryVariables): QueryPromise<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;

interface GetDeclineMessagesForCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeclineMessagesForCategoryVariables): QueryRef<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
}
export const getDeclineMessagesForCategoryRef: GetDeclineMessagesForCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDeclineMessagesForCategory(dc: DataConnect, vars: GetDeclineMessagesForCategoryVariables): QueryPromise<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;

interface GetDeclineMessagesForCategoryRef {
  ...
  (dc: DataConnect, vars: GetDeclineMessagesForCategoryVariables): QueryRef<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
}
export const getDeclineMessagesForCategoryRef: GetDeclineMessagesForCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDeclineMessagesForCategoryRef:
```typescript
const name = getDeclineMessagesForCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetDeclineMessagesForCategory` query requires an argument of type `GetDeclineMessagesForCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDeclineMessagesForCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `GetDeclineMessagesForCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDeclineMessagesForCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDeclineMessagesForCategoryData {
  declineMessages: ({
    id: UUIDString;
    title: string;
    content: string;
    isFavorite?: boolean | null;
    createdAt: TimestampString;
  } & DeclineMessage_Key)[];
}
```
### Using `GetDeclineMessagesForCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDeclineMessagesForCategory, GetDeclineMessagesForCategoryVariables } from '@dataconnect/generated';

// The `GetDeclineMessagesForCategory` query requires an argument of type `GetDeclineMessagesForCategoryVariables`:
const getDeclineMessagesForCategoryVars: GetDeclineMessagesForCategoryVariables = {
  categoryId: ..., 
};

// Call the `getDeclineMessagesForCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDeclineMessagesForCategory(getDeclineMessagesForCategoryVars);
// Variables can be defined inline as well.
const { data } = await getDeclineMessagesForCategory({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDeclineMessagesForCategory(dataConnect, getDeclineMessagesForCategoryVars);

console.log(data.declineMessages);

// Or, you can use the `Promise` API.
getDeclineMessagesForCategory(getDeclineMessagesForCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.declineMessages);
});
```

### Using `GetDeclineMessagesForCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDeclineMessagesForCategoryRef, GetDeclineMessagesForCategoryVariables } from '@dataconnect/generated';

// The `GetDeclineMessagesForCategory` query requires an argument of type `GetDeclineMessagesForCategoryVariables`:
const getDeclineMessagesForCategoryVars: GetDeclineMessagesForCategoryVariables = {
  categoryId: ..., 
};

// Call the `getDeclineMessagesForCategoryRef()` function to get a reference to the query.
const ref = getDeclineMessagesForCategoryRef(getDeclineMessagesForCategoryVars);
// Variables can be defined inline as well.
const ref = getDeclineMessagesForCategoryRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDeclineMessagesForCategoryRef(dataConnect, getDeclineMessagesForCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.declineMessages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.declineMessages);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategories(): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
  } & Category_Key)[];
}
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@dataconnect/generated';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@dataconnect/generated';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  username: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  username: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  username: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., username: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateDeclineMessage
You can execute the `UpdateDeclineMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDeclineMessage(vars: UpdateDeclineMessageVariables): MutationPromise<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;

interface UpdateDeclineMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeclineMessageVariables): MutationRef<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
}
export const updateDeclineMessageRef: UpdateDeclineMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDeclineMessage(dc: DataConnect, vars: UpdateDeclineMessageVariables): MutationPromise<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;

interface UpdateDeclineMessageRef {
  ...
  (dc: DataConnect, vars: UpdateDeclineMessageVariables): MutationRef<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
}
export const updateDeclineMessageRef: UpdateDeclineMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDeclineMessageRef:
```typescript
const name = updateDeclineMessageRef.operationName;
console.log(name);
```

### Variables
The `UpdateDeclineMessage` mutation requires an argument of type `UpdateDeclineMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDeclineMessageVariables {
  id: UUIDString;
  title?: string | null;
  content?: string | null;
  isFavorite?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateDeclineMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDeclineMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDeclineMessageData {
  declineMessage_update?: DeclineMessage_Key | null;
}
```
### Using `UpdateDeclineMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDeclineMessage, UpdateDeclineMessageVariables } from '@dataconnect/generated';

// The `UpdateDeclineMessage` mutation requires an argument of type `UpdateDeclineMessageVariables`:
const updateDeclineMessageVars: UpdateDeclineMessageVariables = {
  id: ..., 
  title: ..., // optional
  content: ..., // optional
  isFavorite: ..., // optional
};

// Call the `updateDeclineMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDeclineMessage(updateDeclineMessageVars);
// Variables can be defined inline as well.
const { data } = await updateDeclineMessage({ id: ..., title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDeclineMessage(dataConnect, updateDeclineMessageVars);

console.log(data.declineMessage_update);

// Or, you can use the `Promise` API.
updateDeclineMessage(updateDeclineMessageVars).then((response) => {
  const data = response.data;
  console.log(data.declineMessage_update);
});
```

### Using `UpdateDeclineMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDeclineMessageRef, UpdateDeclineMessageVariables } from '@dataconnect/generated';

// The `UpdateDeclineMessage` mutation requires an argument of type `UpdateDeclineMessageVariables`:
const updateDeclineMessageVars: UpdateDeclineMessageVariables = {
  id: ..., 
  title: ..., // optional
  content: ..., // optional
  isFavorite: ..., // optional
};

// Call the `updateDeclineMessageRef()` function to get a reference to the mutation.
const ref = updateDeclineMessageRef(updateDeclineMessageVars);
// Variables can be defined inline as well.
const ref = updateDeclineMessageRef({ id: ..., title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDeclineMessageRef(dataConnect, updateDeclineMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.declineMessage_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.declineMessage_update);
});
```

