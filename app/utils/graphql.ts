import { ClientError, GraphQLClient } from "graphql-request";
import { API_HOST } from "~/constants";
import { getSdk, SdkFunctionWrapper } from "~/graphql/types";

export const getGraphqlError = (errors: ClientError["response"]) => {
  const error = errors.response.errors[0];
  const message = error.message;
  if (error.message === "VALIDATION_FAILED") {
    const keys = Object.keys(error.fields);
    return error.fields[keys[0]];
  }

  return message;
};

const client = new GraphQLClient(API_HOST);

const setHeaders: SdkFunctionWrapper = async <T>(action: () => Promise<T>) => {
  // const token = await firebase.auth().currentUser?.getIdToken();
  const token = null;
  client.setHeaders({
    authorization: token || "",
  });
  return action();
};

export const graphql = getSdk(client, setHeaders);
