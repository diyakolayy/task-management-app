pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'my-frontend:latest'
        BACKEND_IMAGE = 'my-backend:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git 'https://github.com/diyakolayy/task-management-app.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                echo '🧪 Running backend tests...'
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Configure Docker for Minikube') {
            steps {
                echo '🔧 Configuring Docker to use Minikube...'
                sh 'eval $(minikube -p minikube docker-env)'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images for frontend and backend...'

                dir('docker/frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }

                dir('docker/backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                sh 'kubectl apply -f kubernetes/backend-deployment.yaml'
                sh 'kubectl apply -f kubernetes/frontend-deployment.yaml'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '🔍 Checking Kubernetes status...'
                sh 'kubectl get pods'
                sh 'kubectl get svc'
            }
        }
    }
}
