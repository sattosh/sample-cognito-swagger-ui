import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as origin from 'aws-cdk-lib/aws-cloudfront-origins';

/** プロパティ定義 */
export type WEBConstructModuleProps = {};

/**
 * モジュール定義
 */
export class WebConstruct extends Construct {
  public readonly distribution: cloudfront.Distribution;
  public readonly mainBucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: WEBConstructModuleProps = {}) {
    super(scope, id);
    const removalPolicy = cdk.RemovalPolicy.DESTROY;

    /** フロント用バケット */
    this.mainBucket = new s3.Bucket(this, 'MainBucket', {
      bucketName: 'sample-cognito-swagger-react',
      autoDeleteObjects: true,
      removalPolicy,
    });

    /** イメージコンテンツ用のバケット */
    const swaggerBucket = new s3.Bucket(this, 'PublicBucket', {
      bucketName: 'sample-cognito-swagger-file',
      autoDeleteObjects: true,
      removalPolicy,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: 'SampleCognitoSwaggerReact',
    });

    // cloudfrontからのアクセスを許可
    [this.mainBucket, swaggerBucket].forEach((bucket) => {
      bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          actions: ['s3:GetObject', 's3:ListBucket'],
          resources: [bucket.arnForObjects('*'), bucket.bucketArn],
          principals: [new iam.CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
        })
      );
    });

    /** フロント用ホスティング */
    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: 'SampleCognitoSwaggerReact',
      defaultBehavior: {
        origin: new origin.S3Origin(this.mainBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
      additionalBehaviors: {
        '/swagger/*': {
          origin: new origin.S3Origin(swaggerBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
      },
      httpVersion: cloudfront.HttpVersion.HTTP2,
      defaultRootObject: 'index.html',
    });

    // 確認用
    new cdk.CfnOutput(this, 'mainBucketName', {
      value: this.mainBucket.bucketName,
    });
    new cdk.CfnOutput(this, 'Domain', {
      value: this.distribution.domainName,
    });
  }
}
