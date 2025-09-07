pipeline {
    agent any
    stages {
        stage('Code') {
            steps {
                echo 'Code Checkout'
                git url: "https://github.com/salilgupta332/fixNflow.git", branch: "dev"
            }
        }
        stage('Build') {
            steps {
                echo 'This is Build stage'
            }
        }
    }
}