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
                    // Add deployment commands if applicable, e.g., deploying to a hosting service
                }
            }
        }

        stage('Start backend server') {
            steps {
                sh 'npm run backend'
            }
        }
    }
}

