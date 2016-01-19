# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
	Encoding.default_external = 'UTF-8'
	config.vm.box = "ubuntu/trusty64"

	config.vm.network :private_network, ip: "10.10.10.17"

	config.vm.provision "shell", path: "setup.sh"

	config.vm.provider "virtualbox" do |v|
		v.memory = 2048
		v.cpus = 2
	end
end
