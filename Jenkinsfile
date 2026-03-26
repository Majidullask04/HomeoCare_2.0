pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building HomeoCare_2.0...'
                // This command installs your project's libraries
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // sh 'npm test'
            }
        }
    }
}
