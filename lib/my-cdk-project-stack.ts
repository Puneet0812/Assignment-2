import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket with a unique name
    const myBucket = new s3.Bucket(this, 'PuneetBucket', {
      bucketName: 'puneet-8910233-bucket', // Must be globally unique
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Deletes bucket when stack is destroyed (Only for development)
    });

    // Create Lambda Function with a reference to the S3 bucket
    const myLambda = new lambda.Function(this, 'PuneetLambda', {
      functionName: 'puneet-8910233-lambda',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda function executed');
          return { statusCode: 200, body: 'Hello from Lambda, Puneet!' };
        }
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,  // Store bucket name as an environment variable
      },
    });

    // Create DynamoDB Table with a unique name
    const myTable = new dynamodb.Table(this, 'PuneetTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'puneet-8910233-table',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}

