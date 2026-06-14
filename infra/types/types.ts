import * as cdk from 'aws-cdk-lib/core';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export interface StackProps extends cdk.StackProps 
{
  namespace: string;
  s3Bucket?: Bucket;
}
