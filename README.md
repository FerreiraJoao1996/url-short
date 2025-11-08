

# Instruções para Execução do Projeto

## Tecnologias Utilizadas

- Node 24.11
- NestJs
- Typescript
- Docker
- Postgres
- Sequelize
- BullMQ

## Passo a Passo para Executar o Projeto no Docker

1. Faça o clone do projeto e inicie
    ```
    https://github.com/FerreiraJoao1996/url-short.git
    cd url-short
    ```

2. Configure a `.env` do projeto para conexão com o banco de dados Postgres:

   ```env
   cp .env.example .env
   cp .env.example.postgres .env
   ```

3. Criando os containers (as migrations serão executadas durante a criação)
    ```
    docker compose up -d --build
    ```

4. Por fim, execute o comando para iniciar o projeto:

   ```
   yarn start:dev
   ```

## Passo a Passo para Executar o Projeto Local

1. Faça o clone do projeto e inicie
    ```
    https://github.com/FerreiraJoao1996/url-short.git
    cd url-short
    ```

2. Configure a `.env` do projeto para conexão com o banco de dados Postgres:

   ```env
   cp .env.example .env
   cp .env.example.postgres .env
   ```

3. Criando os containers (as migrations serão executadas durante a criação)
    ```
    docker compose up -d db redis
    ```

4. Execute os comandos para instalar as dependências:

   ```
   yarn i -g yarn
   yarn install
   yarn migrate
   yarn start:dev
   ```

## Executando os testes

1. Altere e .env para:
    DB_HOST=localhost
    REDIS_HOST=localhost 

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

### 🧩 Escalabilidade Horizontal

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