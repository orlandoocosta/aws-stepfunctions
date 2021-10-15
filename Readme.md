### Prerequisites

- you need AWS CLI installed
- you need AWS SAM CLI installed
- AWS Toolkit for VS Code

### Start the project
- From the AWS Toolkit select "Create Lambda SAM Applicaiton". It's going to generate a dummy lambda function anda a template.yaml where the function is define.
- Create a new file with the Step Funciton worflow. To call the lambda function the arn will be like `arn:aws:lambda:<region>:123456789012:<function_name>`
- Create a new file like where it's needed to define `LAMBDA_ENDPOINT=http://host.docker.internal:3001`(aws-stepfunctions-local-credentials.txt)



### Commands used:

- Start the local Lambda endpoint // you can skip the host and port if you want default (localhost) or you can edit IP and port to your needs
```bash
sam local start-lambda
```

- Start docker container for local Step Functions, on first execution it should automatically pull the needed docker image // make sure you edit localsettings.txt to suit your needs (IP)
```bash
docker run -p 8083:8083 --env-file docker/aws-stepfunctions-local-credentials.txt amazon/aws-stepfunctions-local
``` 

- Create state machine
```bash
aws stepfunctions create-state-machine --endpoint http://localhost:8083 --definition file://StateMachine.json --name "HelloFromLocalStepFunctions" --role-arn "arn:aws:iam::012345678901:role/DummyRole"
```

- save the Step Function arn

- invoke Step Function execution
```bash
aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine <stepFunctionArn> --name test
```

- Execute the describe execution command to see the full details of the execution
```bash
aws stepfunctions --endpoint http://localhost:8083 describe-execution --execution-arn <stepFunctionArn>:test
``` 
