import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

/** プロパティ定義 */
export type AuthModuleProps = {};

/**
 * 認証周り
 */
export class AuthConstruct extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly client: cognito.UserPoolClient;
  public readonly identityProvider: cognito.CfnIdentityPool;
  constructor(scope: Construct, id: string, props: AuthModuleProps = {}) {
    super(scope, id);

    const removalPolicy = cdk.RemovalPolicy.DESTROY;

    /** Cognito */
    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'sample-swagger-react-user-pool',
      selfSignUpEnabled: false,
      removalPolicy,
    });

    this.userPool.addDomain('Domain', {
      cognitoDomain: { domainPrefix: 'sample-swagger-react' },
    });
    this.client = this.userPool.addClient('Client', {
      userPoolClientName: 'sample-cognito-swagger-react',
      authFlows: { adminUserPassword: false, userPassword: true, userSrp: true },
    });

    // 確認用
    new cdk.CfnOutput(this, 'ClientId', {
      value: this.client.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });
  }
}
