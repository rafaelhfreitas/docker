# docker



# image docker hub go-hello-world : 
https://hub.docker.com/repository/docker/bigworks/go-hello-world/general



Pessoal, precisando de ajuda pra entender o pq do erro no docker logs da rede não estar funcioando com o nginx como proxy reverso.


``
2024/04/23 02:59:58 [error] 7#7: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.64.1, server: localhost, request: "GET / HTTP/1.1", upstream: "http://192.168.64.3:3000/", host: "localhost:8080"
192.168.64.1 - - [23/Apr/2024:02:59:58 +0000] "GET / HTTP/1.1" 502 575 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" "-"
2024/04/23 02:59:58 [error] 7#7: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.64.1, server: localhost, request: "GET /favicon.ico HTTP/1.1", upstream: "http://192.168.64.3:3000/favicon.ico", host: "localhost:8080", referrer: "http://localhost:8080/"
192.168.64.1 - - [23/Apr/2024:02:59:58 +0000] "GET /favicon.ico HTTP/1.1" 502 575 "http://localhost:8080/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" "-"
``

Revendo as aulas, não consigo rodar o docker network inspect node-network
``
 rafael-ubuntu@rafael-ubuntu-Inspiron-5548  ~/projetos/docker   main ±  docker network inspect node-network
[]
Error response from daemon: network node-network not found
``


``
 docker-compose ps
Name               Command               State                    Ports                  
-----------------------------------------------------------------------------------------
app     dockerize -wait tcp://db:3 ...   Up      0.0.0.0:3000->3000/tcp,:::3000->3000/tcp
db      docker-entrypoint.sh --inn ...   Up      3306/tcp, 33060/tcp                     
nginx   nginx -g daemon off;             Up      0.0.0.0:8080->80/tcp,:::8080->80/tcp    

``




COnsegui validar que os tres conteiners estão na mesma rede.
``

 rafael-ubuntu@rafael-ubuntu-Inspiron-5548  ~/projetos/docker   main ±  docker inspect db
[
    {
        "Id": "2203dede0980a84875dbd8389ab221d2f53c1a67f1ebbc983f9105c7ba635820",
        "Created": "2024-04-23T03:16:08.530255273Z",
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "30bc12cb33f89a67ef8ea095cc96a1b446c0580058c0c2efcd5ec29c8b7e130e",
            "SandboxKey": "/var/run/docker/netns/30bc12cb33f8",
            "Ports": {
                "3306/tcp": null,
                "33060/tcp": null
            },
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "docker_node-network": {
                    "IPAMConfig": {},
                    "Links": null,
                    "Aliases": [
                        "db",
                        "2203dede0980"
                    ],
                    "MacAddress": "02:42:c0:a8:a0:02",
                    "NetworkID": "e5434650012137c29a98cab54a680637f7adda209a1a07758e635f30b79748c2",
                    "EndpointID": "0bb213dc7e79c0f357be18ef9e690aac3dea4988c7a6accdbae28c85c963a020",
                    "Gateway": "192.168.160.1",
                    "IPAddress": "192.168.160.2",
                    "IPPrefixLen": 20,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null,
                    "DNSNames": [
                        "db",
                        "2203dede0980"
                    ]
                }
            }
        }
    }
]
 rafael-ubuntu@rafael-ubuntu-Inspiron-5548  ~/projetos/docker   main ±  docker inspect app
[
    {
        "Id": "58497bc4d0edf4aead3d1b826d0f9ab743452fdbe785f62bf5cbde501309b23e",
        "Created": "2024-04-23T03:16:08.958198525Z",
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "079c402b6b27a92db1df5c82c9a91fb03e30cfbbfba63c0d0bba3141ffa89c15",
            "SandboxKey": "/var/run/docker/netns/079c402b6b27",
            "Ports": {
                "3000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3000"
                    },
                    {
                        "HostIp": "::",
                        "HostPort": "3000"
                    }
                ]
            },
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "docker_node-network": {
                    "IPAMConfig": {},
                    "Links": null,
                    "Aliases": [
                        "app",
                        "58497bc4d0ed"
                    ],
                    "MacAddress": "02:42:c0:a8:a0:03",
                    "NetworkID": "e5434650012137c29a98cab54a680637f7adda209a1a07758e635f30b79748c2",
                    "EndpointID": "9c0d066973462fd9b937ad03c391b851dab0890f14fb9aed161e70c2ea5c7126",
                    "Gateway": "192.168.160.1",
                    "IPAddress": "192.168.160.3",
                    "IPPrefixLen": 20,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null,
                    "DNSNames": [
                        "app",
                        "58497bc4d0ed"
                    ]
                }
            }
        }
    }
]
 rafael-ubuntu@rafael-ubuntu-Inspiron-5548  ~/projetos/docker   main ±  docker inspect nginx
[
    {
        "Id": "69760e4ab94b8be7ce246b52c93b983a63ee7c007d10b278e91d5ba8f92e96e4",
        "Created": "2024-04-23T03:16:09.360089492Z",
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "65acbdea94513b60c2331df06390f827596a3eadaca6930aaa5183f8dc01aa44",
            "SandboxKey": "/var/run/docker/netns/65acbdea9451",
            "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8080"
                    },
                    {
                        "HostIp": "::",
                        "HostPort": "8080"
                    }
                ]
            },
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "docker_node-network": {
                    "IPAMConfig": {},
                    "Links": null,
                    "Aliases": [
                        "nginx",
                        "69760e4ab94b"
                    ],
                    "MacAddress": "02:42:c0:a8:a0:04",
                    "NetworkID": "e5434650012137c29a98cab54a680637f7adda209a1a07758e635f30b79748c2",
                    "EndpointID": "348603e0100647b1016a00bbfea76d29a4174e02d82146723c86598144142396",
                    "Gateway": "192.168.160.1",
                    "IPAddress": "192.168.160.4",
                    "IPPrefixLen": 20,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null,
                    "DNSNames": [
                        "nginx",
                        "69760e4ab94b"
                    ]
                }
            }
        }
    }
]

``



AI estou em duvida ainda sobre o arquivo conf do nginx que estou copiando da minha maquina local para a imagem do nginx:

Já testei com ele nesse formato
``
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

``




Já testei com ele nesse formato
``
server {
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

Já testei com ele nesse formato
``
server {

    location / {
        proxy_pass http://0.0.0.0:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

``

