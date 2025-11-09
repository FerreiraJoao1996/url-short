## Tecnologias Utilizadas

- Node 24.11
- NestJs
- Typescript
- Docker
- Postgres
- Sequelize
- BullMQ

## Instalando o NVM para uso do node

#### O uso do NVM (Node Version Manager) facilita o controle da versão do Node no ambiente local.
Este passo é necessário somente se você for rodar o projeto fora do Docker.

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.bashrc 
    nvm -v
    nvm install --lts
    nvm use --lts
    node -v
    ```

## Passo a Passo para Executar o Projeto no Docker

1. Faça o clone do projeto e inicie
    ```
    git clone https://github.com/FerreiraJoao1996/url-short.git
    cd url-short
    ```

2. Configure a `.env` do projeto para conexão com o banco de dados Postgres:

   ```
   cp .env.example .env
   cp .env.postgres.example .env.postgres
   ```

3. Criando os containers (as migrations serão executadas durante a criação)
    ```
    docker compose up -d --build

## Passo a Passo para Executar o Projeto Local

1. Faça o clone do projeto e inicie
    ```
    git clone https://github.com/FerreiraJoao1996/url-short.git
    cd url-short
    ```

2. Configure a `.env` do projeto para conexão com o banco de dados Postgres:

   ```env
   cp .env.example .env
   cp .env.postgres.example .env.postgres
   ```

3. Criando os containers
    ```
    docker compose up -d db redis
    ```

4. Execute os comandos para instalar as dependências:

   ```
   npm i -g yarn
   yarn install
   ```

5. Executando as migrations

    ##### Altere o .env para: 
    ```
    DB_HOST=localhost
    REDIS_HOST=localhost 
    ```
    
    ##### Execute o comando:
    ```
    yarn migrate
    ```

5. Inicie o projeto
    ```
    yarn start:dev
    ```
### Em ambos os casos, o projeto ficará disponivel em http://localhost:3000

## Executando os testes

### Caso esteja rodando o projeto no docker, rode o comando:
    ```
    docker compose run --rm app yarn test:e2e
    ```

### Caso esteja rodando o projeto localmente:

1. Altere e .env para:
    ```
    DB_HOST=localhost
    REDIS_HOST=localhost 
    ```

2. Execute os testes
    ```
    yarn test:e2e
    ```

## Documentação
- A documentação no swagger está disponível em http://localhost:3000/api/docs/

## Diferenciais
- Configurado Biome para lint e formatação
- Validação dos campos com class-validator
- Docker compose configurado para provisionar todo o ambiente automaticamente
- Controle de contagem de acessos através de um worker com BullMQ

## Como o sistema poderia escalar em produção

### Escalabilidade Vertical

Consiste em aumentar os recursos da máquina (**CPU, RAM, disco**).

**Como aplicar:** aumentar o tamanho da instância EC2 ou container do serviço.  

**Desafios:** custo elevado e limite físico do servidor.  

**Soluções:** usar *auto-scaling groups* na nuvem (**AWS**) para ajustar automaticamente os recursos conforme a carga.

---

### Escalabilidade Horizontal

Consiste em adicionar **novas instâncias do serviço** e balancear o tráfego entre elas.

**Como aplicar:**
- Subir múltiplos containers da API atrás de um **load balancer** (AWS ALB).
- Usar um **banco de dados gerenciado** (ex: Amazon RDS para Postgres) com **read replicas**.
- Armazenar **sessões ou cache** em um serviço distribuído, como **Redis**.

**Desafios:**
-  **Sincronização de dados** entre múltiplas instâncias da aplicação.  
-  **Gerenciamento de conexões** simultâneas ao banco de dados.
-  **Monitoramento e observabilidade** de múltiplos nós em execução.  
-  **Evitar sobrecarga** de um único ponto (banco, cache, fila ou serviço externo).

**Soluções:**
- Adotar **ferramentas de observabilidade** (Prometheus, Grafana, Loki, ELK) para monitorar métricas e logs.  
- Distribuir o tráfego com **Load Balancer** inteligente e *health checks* automáticos.  
- Utilizar **mensageria** (BullMQ, RabbitMQ ou Kafka) para processar tarefas de forma assíncrona e escalável.
