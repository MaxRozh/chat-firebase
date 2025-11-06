import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  username: string;
}

export interface DeclineMessage_Key {
  id: UUIDString;
  __typename?: 'DeclineMessage_Key';
}

export interface GetDeclineMessagesForCategoryData {
  declineMessages: ({
    id: UUIDString;
    title: string;
    content: string;
    isFavorite?: boolean | null;
    createdAt: TimestampString;
  } & DeclineMessage_Key)[];
}

export interface GetDeclineMessagesForCategoryVariables {
  categoryId: UUIDString;
}

export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
  } & Category_Key)[];
}

export interface SharedHistory_Key {
  id: UUIDString;
  __typename?: 'SharedHistory_Key';
}

export interface UpdateDeclineMessageData {
  declineMessage_update?: DeclineMessage_Key | null;
}

export interface UpdateDeclineMessageVariables {
  id: UUIDString;
  title?: string | null;
  content?: string | null;
  isFavorite?: boolean | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetDeclineMessagesForCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeclineMessagesForCategoryVariables): QueryRef<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDeclineMessagesForCategoryVariables): QueryRef<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
  operationName: string;
}
export const getDeclineMessagesForCategoryRef: GetDeclineMessagesForCategoryRef;

export function getDeclineMessagesForCategory(vars: GetDeclineMessagesForCategoryVariables): QueryPromise<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
export function getDeclineMessagesForCategory(dc: DataConnect, vars: GetDeclineMessagesForCategoryVariables): QueryPromise<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;

interface UpdateDeclineMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeclineMessageVariables): MutationRef<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDeclineMessageVariables): MutationRef<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
  operationName: string;
}
export const updateDeclineMessageRef: UpdateDeclineMessageRef;

export function updateDeclineMessage(vars: UpdateDeclineMessageVariables): MutationPromise<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
export function updateDeclineMessage(dc: DataConnect, vars: UpdateDeclineMessageVariables): MutationPromise<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

