pipeline {
    agent any
    environment{
        ANSIBLE_SERVER = "13.233.161.249"
        ANSIBLE_PRIVATE_IP = "172.31.38.163"
        K8S_SERVER = ""
        WORKSPACE_DIR = "/var/lib/jenkins/workspace/todo_pipeline"
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
    }
}