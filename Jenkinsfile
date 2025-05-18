pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/task-management-app.git'
            }
        }
        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                dir('docker/frontend') {
                    sh 'docker build -t task-management-frontend:latest .'
                }
                dir('docker/backend') {
                    sh 'docker build -t task-management-backend:latest .'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kubernetes/frontend-deployment.yaml'
                sh 'kubectl apply -f kubernetes/backend-deployment.yaml'
            }
        }
    }
}