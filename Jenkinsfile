pipeline {
    agent any
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'YOUR_GITHUB_URL_HERE'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                // Add your build command here (e.g., npm install)
            }
        }
    }
}
