pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building HomeoCare_2.0...'
                // Use 'dir' to go into the subfolder where package.json lives
                dir('app') { 
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
    }
}
