## Desafio Player2

### Estrutura da aplicação

:ballot_box_with_check: Autenticação de usuário

:ballot_box_with_check: Cadastro de empresas, obtendo os dados a partir do [BrasilAPI](https://brasilapi.com.br/)

### Tecnologias Utilizadas

- typescript
- typeorm
- express
- axios
- mysql

### Rodando a aplicação

1. clone o repositório da aplicação

```
git clone git@github.com:abelsouzacosta/become-player2.git

cd become-player2
```

2. Crie um banco de dados para a aplicação

3. Renomeie os arquivos `.ormconfig.env` e `.env.example` para `ormconfig.env` e `.env`, respectivamente

4. Atribua os valores para as seguintes variáveis:

```
# Username do banco de dados
TYPEORM_USERNAME =

# Senha do banco
TYPEORM_PASSWORD =

# Nome do banco
TYPEORM_DATABASE =
```

5. Instale os pacotes com `yarn`

6. Neste projeto foi usado o typeorm, para que seja possível fazer o uso de migrations é preciso ter o pacote `ts-node` instalado globalmente, se você não possuir este pacote instalado de forma global pode instalá-lo usando o comando:

> `npm -g install ts-node` ou `sudo npm -g install ts-node` (caso em ambiente linux)

7. Execute as migrations das tabelas com o comando: `yarn typeorm migration:run`

8. Inicialize a aplicação com `yarn dev`

### Endpoints

Os endpoints da aplicação estão documentados abaixo

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Player%202&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fabelsouzacosta%2Fhivelabs-challenge-endpoints%2Fmaster%2Fplayer2-final%3Ftoken%3DAHJQ6XDCXJM73XNG6USUI4LBDMFJU)
