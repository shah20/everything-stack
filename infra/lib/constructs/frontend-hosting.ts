import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { RemovalPolicy } from 'aws-cdk-lib';
import { StackProps } from '../../types/types';

export class FrontendHosting extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id);

    const assetPath = process.env.CDK_DESTROY === 'true' ? './../empty-dist' : './../frontend/dist';

    this.bucket = new s3.Bucket(this, `FrontendHosting-${props.namespace}`, {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: `shah20-frontend-hosting-${props.namespace}`,
    });

    new s3deploy.BucketDeployment(this, 'DeployFrontend', {
      destinationBucket: this.bucket,
      sources: [
        s3deploy.Source.asset(assetPath)
      ]
    });
  }
}