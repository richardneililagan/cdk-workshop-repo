import * as cdk from '@aws-cdk/core'

import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines'
import * as codepipeline from '@aws-cdk/aws-codepipeline'
import * as actions from '@aws-cdk/aws-codepipeline-actions'

import { ServerlessInfraStack } from './serverless-infra-stack';
import { VmStack } from './vm-stack'

// :: ---

class Application extends cdk.Stage {
    constructor (scope: cdk.Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props)
        
        new ServerlessInfraStack(scope, 'ServerlessInfraStack');
        new VmStack(scope, 'vm-stack')
    }
}

export class PipelineStack extends cdk.Stack {
    constructor (scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)
        
        // :: (1) define trigger
        // :: (2) define build + compile
        // :: (3) define the deploy
        
        const sourceArtifact = new codepipeline.Artifact()
        const cloudAssemblyArtifact = new codepipeline.Artifact()
        
        // :: (1) --- this triggers when code changes in the repo
        const sourceAction = new actions.GithubSourceAction({
            actionName: 'new-code-change-trigger',
            output: sourceArtifact,
            owner: 'richardneililagan',
            repo: 'cdk-workshop-repo',
            branch: 'master',
            oauthToken: cdk.SecretValue.secretsManager('workshop/cdk/github-token')
        })
        
        // :: (2) --- 
        const synthAction = SimpleSynthAction.standardNpmSynth({
            sourceArtifact: sourceArtifact,
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            environment: { privileged: true }
        })
        
        // :: (3) ---
        const pipeline = new CdkPipeline(this, 'app-pipeline', {
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            sourceAction: sourceAction,
            synthAction: synthAction
        })
        
        pipeline.addApplicationStage(new Application(this, 'production-environment'))
    }
}