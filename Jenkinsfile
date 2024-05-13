pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build and deploy frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    // Build Docker image for frontend
                    sh 'docker build -t frontend-image:latest .'
                    // Push the Docker image to your Docker registry if needed
                    // sh 'docker push your-registry/frontend-image:latest'
                    // Deploy the Docker container to your hosting service if needed
                    // Example: sh 'docker run -d -p 80:80 your-registry/frontend-image:latest'
                }
            }
        }

        stage('Build backend image') {
            steps {
                dir('backend') {
                    // Build Docker image for backend
                    sh 'docker build -t backend-image:latest .'
                    // Push the Docker image to your Docker registry if needed
                    // sh 'docker push your-registry/backend-image:latest'
                    // Deploy the Docker container to your hosting service if needed
                    // Example: sh 'docker run -d -p 3001:3001 your-registry/backend-image:latest'
                }
            }
        }
    }
}
