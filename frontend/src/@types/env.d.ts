declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_AWS_REGION: string;
    REACT_APP_COGNITO_CLIENT_ID: string;
    REACT_APP_COGNITO_USER_POOL_ID: string;
  }
}
