pipeline {
    agent any
    environment {
        ANSIBLE_SERVER = "65.0.31.107"
        ANSIBLE_PRIVATE_IP = "172.31.38.163"
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
        stage("Build Backend Docker image on EC2") {
            steps {
                sshagent(['ansible']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'cd /home/ubuntu/fixnflow/fixNflow-backend && docker image build -t fixnflow-backend:v1.${BUILD_ID} .'"
                }
            }
        }
        stage("Build Frontend Docker image on EC2") {
            steps {
                sshagent(['ansible']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'cd /home/ubuntu/fixnflow/fixnflow-frontend && docker image build -t fixnflow-frontend:v1.${BUILD_ID} .'"
                }
            }
        }
        stage("Image Tagging ") {
            steps {
                sshagent(['ansible']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker image tag fixnflow-backend:v1.${BUILD_ID} devop0502/fixnflow-backend:v1.${BUILD_ID}'"
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker image tag fixnflow-backend:v1.${BUILD_ID} devop0502/fixnflow-backend:latest'"
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker image tag fixnflow-frontend:v1.${BUILD_ID} devop0502/fixnflow-frontend:v1.${BUILD_ID}'"
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker image tag fixnflow-frontend:v1.${BUILD_ID} devop0502/fixnflow-frontend:latest'"
                }
            }
        }
        stage("Pushing image to Docker Hub") {
            steps {
                sshagent(['ansible']) {
                    echo 'Pushing Image to Docker hub'
                    withCredentials([usernamePassword(credentialsId: "dockerhub", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")]) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker login -u ${dockerHubUser} -p ${dockerHubPass}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/fixnflow-backend:v1.${BUILD_ID}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/fixnflow-backend:latest'"
                        echo "Backed Images Successfully pushed to Docker Hub"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/fixnflow-frontend:v1.${BUILD_ID}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/fixnflow-frontend:latest'"
                        echo "Fronted Images Successfully pushed to Docker Hub"
                    }
                }
            }
        }
    }
}