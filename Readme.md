### Prerequisites

- you need AWS CLI installed
- you need AWS SAM CLI installed

### Commands used:

- Start the local Lambda endpoint // you can skip the host and port if you want default (localhost) or you can edit IP and port to your needs
```bash
sam local start-lambda
```

- Start docker container for local Step Functions, on first execution it should automatically pull the needed docker image
```bash
docker run -p 8083:8083 amazon/aws-stepfunctions-local
``` 

- Create state machine
```bash
aws stepfunctions create-state-machine --endpoint http://localhost:8083 --definition file://StateMachine.json --name "HelloFromLocalStepFunctions" --role-arn "arn:aws:iam::012345678901:role/DummyRole"
```

- invoke Step Function execution
```bash
aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine arn:aws:states:us-east-1:123456789012:stateMachine:HelloFromLocalStepFunctions --name test
```

- Execute the describe execution command to see the full details of the execution
```bash
aws stepfunctions --endpoint http://localhost:8083 describe-execution --execution-arn arn:aws:states:us-east-1:123456789012:execution:HelloFromLocalStepFunctions:test
``` 
