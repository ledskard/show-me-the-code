# Show Me The Code - backend - Possível solução

## Requisitos:

É necessário ter o NodeJS instalado, você pode baixá-lo aqui [NodeJS](https://nodejs.org/en/).

É necessário ter o Docker instalado, você pode baixá-lo aqui [Docker](https://hub.docker.com/).

Para rodar o banco de dados basta executar o seguinte comando no terminal:

- docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

Após subir o banco de dados deve-se entrar na pasta raíz do projeto e executar o seguinte comando para criar as tabelas do banco de dados.

 - npm run typeorm migration:run 

## Rodando o projeto: 

Para rodar o projeto basta entrar na pasta raíz e executar os seguintes comandos no terminal: 

 - npm install

 - npm start

## Tests:

Esse projeto possui testes unitários, para rodá-los deve-se executar os seguintes comandos no terminal: 

 - npm test

Após o comando ter sido executado será gerada uma pasta chamada Coverage que possuirá informações sobre a cobertura dos testes.