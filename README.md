<h1 align="center">
<br>
    IPs Tor API
<hr>

![API](./public/img/readme-wallpaper.png)

</h1>

## Features

Abaixo estão todas as features usadas nesse projeto:

- **Typescript** — Superset Javascript
- **React & CRA** — Biblioteca Javascript e base de projeto
- **TailwindCSS** — Estilização
- **Express** — Server Framework Node
- **MongoDB & Mongoose** — Banco de dados NoSQL e biblioteca Javascript
- **node-localstorage** — Biblioteca Javascript
- **date-fns** — Biblioteca para manipulação de tempo, hora e data

<br>

## Instruções

No ato de clonar o repositório, um arquivo .env necessita ser criado com a porta e a url abaixo:

```
   PORT=5555
   MONGO_URL=mongodb://db:27017/exceptions
```

Caso surja um erro da porta do mongodb em uso, encerre o processo que usa a mesma. Uma das formas será, por exemplo:

```
   sudo netstat -pna | grep 27017
   sudo kill -9 <PID>
```

Execute o comando para compor os containers:

```
   docker-compose up
```

**\_Obs.:** você pode usar a flag -d para rodar no background, ou deixar assim para obter algumas outras informações através do console. Caso precise, utilize sudo para ceder autorização ou y para aceitar algum pedido.</br>
**\_Lembrando.:** O Docker precisa estar instalado, assim como o docker-compose e também o Node.

[Node](https://nodejs.org/en/download/)</br>
[Docker](https://docs.docker.com/get-docker/)</br>
[Docker compose](https://docs.docker.com/compose/install/)

Após já estar rodando os containers, para acessar a documentação da API acesse o link abaixo:

[Documentação API](http://localhost:5555/doc/) ou http://localhost:5555/doc

<br>

## Referências

[Documentação do Node](https://nodejs.org/en/docs/)</br>
[Documentação do Typescript](https://www.typescriptlang.org/docs/)</br>
[Documentação do Express](https://expressjs.com)</br>
[Documentação do Mongoose](https://mongoosejs.com)</br>
[Documentação do Swagger](https://swagger.io/docs/specification/about/)</br>
[Fonte 1 dos IPs](https://www.dan.me.uk/tornodes)</br>
[Fonte 2 dos IPs](https://onionoo.torproject.org/summary?limit=5000)

<br>

## Agradecimentos

Este desafio foi proposto pela equipe da empresa [Proof. - Segurança da Informação](https://www.proof.com.br/). Muito grato pela experiência!
