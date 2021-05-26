#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { PipelineStack } from '../lib/pipeline-stack'
// import { ServerlessInfraStack } from '../lib/serverless-infra-stack';
// import { VmStack } from '../lib/vm-stack'

// :: ---

const app = new cdk.App();

new PipelineStack(app, 'pipeline')
// new ServerlessInfraStack(app, 'ServerlessInfraStack');
// new VmStack(app, 'vm-stack')
