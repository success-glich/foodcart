### Commands To get Started 

## Install and configure SonarQube (Master machine)
 
``` bash
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community
```

## Install Trivy (Jenkins Worker)

``` bash
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y
```

