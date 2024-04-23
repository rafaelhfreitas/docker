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