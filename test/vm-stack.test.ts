import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import { SynthUtils } from '@aws-cdk/assert'
import '@aws-cdk/assert/jest'

import { VmStack } from '../lib/vm-stack'

// :: ---

// :: TODO smoke test
it('synthesizes without errors', () => {
    const app = new cdk.App()
    const stack = new VmStack(app, 'my-vm-stack')
    
    const template = SynthUtils.toCloudFormation(stack)
})

it('has a network using CIDR 50.0.0.0/16', () => {
    const app = new cdk.App()
    const stack = new VmStack(app, 'my-vm-stack')
    
    expect(stack).toHaveResource('AWS::EC2::VPC', {
        CidrBlock: '50.0.0.0/16'
    })
})

it('has all instances running Linux', () => {
    const app = new cdk.App()
    const stack = new VmStack(app, 'my-vm-stack')
    
    const instances = stack.node.children.filter(
        child => child instanceof ec2.Instance
    )
    
    for (const instance of instances) {
        const __instance = instance as ec2.Instance
        
        expect(__instance.osType).toBe(ec2.OperatingSystemType.LINUX)
    }
})