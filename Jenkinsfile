pipeline {
    agent any

    environment{
        ANSIBLE_SERVER = "43.204.36.180"
        ANSIBLE_PRIVATE_IP = "172.31.39.154"
        K8S_SERVER = ""
        WORKSPACE_DIR = "/var/lib/jenkins/workspace/FixNFlow-dev"
    }
    stages {
        stage('Code') {
            steps {
                echo 'Code Checkout'
                git url: "https://github.com/salilgupta332/fixNflow.git", branch: "dev"
            }
        }
        stage("Sending Docker file to ansible server") {
            steps {
                sshagent(['ansible']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER}"
                    sh "scp -o StrictHostKeyChecking=no -r ${WORKSPACE_DIR}/* ubuntu@${ANSIBLE_SERVER}:/home/ubuntu/fixnflow"
                }
            }
        }
            stage("Build Docker image on EC2") {
            steps {
                sshagent(['ansible']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'cd /home/ubuntu/fixnflow/fixNflow-backend && docker image build -t fixnflow-backend:v1.${BUILD_ID} .'"
                }
            }
        }
    }
}