### Prerequisites

- AWS CLI
- AWS SAM CLI
- AWS Toolkit for VS Code
- Docker

### Start the project

- From the AWS Toolkit select `Create Lambda SAM Applicaiton`. It's going to generate a dummy lambda function anda a template.yaml where the function is define.

- Create a new file with the Step Funciton worflow. To create a lambda task, use the following arn `arn:aws:lambda:<region>:123456789012:<function_name>`

- Create a new file like where it's needed to define `LAMBDA_ENDPOINT=http://host.docker.internal:3001`(eg: aws-stepfunctions-local-credentials.txt) This is needed to run the `docker amazon/aws-stepfunctions-local command`

- Each lambda function need to the define in the `template.yaml` file 


### Run Step Functions

- Start the local Lambda endpoint // you can skip the host and port if you want default (localhost) or you can edit IP and port to your needs
```bash
sam local start-lambda
```

- Start docker container for local Step Functions, on first execution it should automatically pull the needed docker image
```bash
docker run -p 8083:8083 --env-file docker/aws-stepfunctions-local-credentials.txt amazon/aws-stepfunctions-local
``` 

- Create state machine
```bash
aws stepfunctions create-state-machine --endpoint http://localhost:8083 --definition file://<STEP_FUNCTION_NAME>.asl.json --name "<STEP_FUNCTION_NAME>" --role-arn "arn:aws:iam::012345678901:role/DummyRole"
```

- Invoke Step Function execution
```bash
aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine <STEP_FUNCTION_ARN> --name <TEST_NAME>
```

- Execute the describe execution command to see the full details of the execution
```bash
aws stepfunctions --endpoint http://localhost:8083 describe-execution --execution-arn arn:aws:states:<REGION>:123456789012:execution:<STEP_FUNCTION_NAME>:<TEST_NAME>
``` 

### Execute Step Function with an event

- Generate event file
```bash
aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine arn:aws:states:<REGION>:123456789012:stateMachine:<STEP_FUNCTION_ARN> --generate-cli-skeleton input > <EVENT_FILENAME>.json
```

- Edit the `<EVENT_FILENAME>` and add the json event as a string in the input object (eg: `"input": "{\"orderNumber\": \"12345\",\"target\": \"DISTRIBUTOR\",\"emailConfiguration\": {}}"`)

- Run the step function wiht the event
```bash
aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine <STEP_FUNCTION_ARN> --name test --cli-input-json file://<EVENT_FILENAME>.json
```
