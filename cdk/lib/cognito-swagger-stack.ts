import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthConstruct, WebConstruct } from './constructs';

export class CognitoSwaggerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new WebConstruct(this, 'WebConstruct');
    new AuthConstruct(this, 'AuthConstruct');
  }
}
