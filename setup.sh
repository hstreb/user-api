#/bin/bash

# swap
swapsize=1024

grep -q "swapfile" /etc/fstab

if [ $? -ne 0 ]; then
  echo 'swapfile not found. Adding swapfile.'
  fallocate -l ${swapsize}M /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap defaults 0 0' >> /etc/fstab
else
  echo 'swapfile found. No changes made.'
fi

##configure locale
sudo locale-gen pt_BR pt_BR.UTF-8
sudo echo America/Sao_Paulo > /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata
sudo dpkg-reconfigure -f noninteractive locales

MONGODB_VERSION=3.2
NODEJS_VERSION=4.x

# add ppas
sudo add-apt-repository ppa:webupd8team/java -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/${MONGODB_VERSION} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-${MONGODB_VERSION}.list
sudo apt-get update

#install nodejs
curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION} | sudo bash -
sudo apt-get install -y nodejs
sudo mkdir /usr/lib/node_modules
sudo chown vagrant:vagrant -R /usr/lib/node_modules
sudo npm install npm -g

#install git
sudo apt-get install -y git

# install mongodb
sudo apt-get install mongodb-org -y

# install loopback
sudo npm install -g strongloop