import { Amplify } from 'aws-amplify';
import { AWS_REGION, CLIENT_ID, USER_POOL_ID } from '../../constants';

export const configure = () => {
  Amplify.configure({
    Auth: {
      region: AWS_REGION,
      userPoolId: USER_POOL_ID,
      userPoolWebClientId: CLIENT_ID,
    },
  });
};
