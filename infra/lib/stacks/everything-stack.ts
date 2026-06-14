import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { FrontendHosting } from '../constructs/frontend-hosting';
import { StackProps } from '../../types/types';
import { FrontEndDistribution } from '../constructs/frontend-distribution';

export class EverythingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const frontendHosting = new FrontendHosting(
      this,
      'FrontendHosting',
      props
    );

    const frontendDistribution = new FrontEndDistribution(
      this,
      'FrontendDistribution',
      {
        namespace: props.namespace,
        s3Bucket: frontendHosting.bucket
      }
    );

    // Access bucket if needed
    new cdk.CfnOutput(this, 'BucketName', {
      value: frontendHosting.bucket.bucketName,
    });

    new cdk.CfnOutput(this, 'CloudFrontUrl', {
      value: `https://${frontendDistribution.distribution.domainName}`,
    });
  }
}
