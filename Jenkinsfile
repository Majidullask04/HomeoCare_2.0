pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building HomeoCare_2.0...'
                // This will now find the package.json you just created
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
    }
}
