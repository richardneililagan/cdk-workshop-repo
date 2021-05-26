import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'

// :: ---

export interface VmStackProps extends cdk.StackProps {
  //
}

export class VmStack extends cdk.Stack {
  vpc: ec2.Vpc
  
  constructor (scope: cdk.Construct, id: string, props?: VmStackProps) {
    super(scope, id, props)
  
    // :: create a new network
    this.vpc = new ec2.Vpc(this, 'vm-network', {
      maxAzs: 3,
      cidr: '50.0.0.0/16'
    })
    
    // :: create a new VM / EC2
    new ec2.Instance(this, 'my-vm', {
      vpc: this.vpc,
      instanceType: new ec2.InstanceType('m5.large'),
      machineImage: ec2.MachineImage.latestAmazonLinux()
    })
  }
  
  onValidate(): string[] {
    return []
  }
}