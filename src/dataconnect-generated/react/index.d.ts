import { CreateUserData, CreateUserVariables, GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables, UpdateDeclineMessageData, UpdateDeclineMessageVariables, ListCategoriesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetDeclineMessagesForCategory(vars: GetDeclineMessagesForCategoryVariables, options?: useDataConnectQueryOptions<GetDeclineMessagesForCategoryData>): UseDataConnectQueryResult<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;
export function useGetDeclineMessagesForCategory(dc: DataConnect, vars: GetDeclineMessagesForCategoryVariables, options?: useDataConnectQueryOptions<GetDeclineMessagesForCategoryData>): UseDataConnectQueryResult<GetDeclineMessagesForCategoryData, GetDeclineMessagesForCategoryVariables>;

export function useUpdateDeclineMessage(options?: useDataConnectMutationOptions<UpdateDeclineMessageData, FirebaseError, UpdateDeclineMessageVariables>): UseDataConnectMutationResult<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;
export function useUpdateDeclineMessage(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDeclineMessageData, FirebaseError, UpdateDeclineMessageVariables>): UseDataConnectMutationResult<UpdateDeclineMessageData, UpdateDeclineMessageVariables>;

export function useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
export function useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
