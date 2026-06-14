import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cdk from 'aws-cdk-lib/core';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';
import { StackProps } from '../../types/types';

export class FrontEndDistribution extends Construct {
  public distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id);

    this.distribution = new cloudfront.Distribution(this, `shah20-frontend-distribution-${props.namespace}`, {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(props.s3Bucket!),
      },
      defaultRootObject: 'index.html',
      comment: `Frontend Distribution for ${props.namespace}`,
    });

    cdk.Tags.of(this.distribution).add(
      'Name',
      `frontend-distribution-${props.namespace}`
    );
  }
}