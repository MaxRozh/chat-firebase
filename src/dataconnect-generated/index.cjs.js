const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'chat-firebase',
  location: 'us-south1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getDeclineMessagesForCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDeclineMessagesForCategory', inputVars);
}
getDeclineMessagesForCategoryRef.operationName = 'GetDeclineMessagesForCategory';
exports.getDeclineMessagesForCategoryRef = getDeclineMessagesForCategoryRef;

exports.getDeclineMessagesForCategory = function getDeclineMessagesForCategory(dcOrVars, vars) {
  return executeQuery(getDeclineMessagesForCategoryRef(dcOrVars, vars));
};

const updateDeclineMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDeclineMessage', inputVars);
}
updateDeclineMessageRef.operationName = 'UpdateDeclineMessage';
exports.updateDeclineMessageRef = updateDeclineMessageRef;

exports.updateDeclineMessage = function updateDeclineMessage(dcOrVars, vars) {
  return executeMutation(updateDeclineMessageRef(dcOrVars, vars));
};

const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';
exports.listCategoriesRef = listCategoriesRef;

exports.listCategories = function listCategories(dc) {
  return executeQuery(listCategoriesRef(dc));
};
