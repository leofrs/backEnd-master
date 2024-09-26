# Back-End: Master

![Tela principal](/public/assets/swagger.png)

## Descrição

Este projeto vai ser utilizado como o "servidor principal" para todas as minhas aplicações de estudo que necessitam de um back-end um pouco mais robusto e com várias funcionalidades. Ele pode ser aplicado em diversos projetos com algumas caracteristicas semelhantes ou até mesmo diferentes.

## Funcionalidades

-   **Gerenciamento de Tarefas:** O famoso CRUD: CREATE, READ, UPDATED and DELETE voltado a tarefas(to-do list).
-   **Criação de usuário com criptografia de senha:** Utilizando o Bcrypt para realizar essa operação de hash.
-   **Autenticação e Autorização:** Utilizando o JWT para autenticar e autorizar o acesso a determinadas páginas.

## Requisitos Técnicos

### Backend

-   **Linguagem:** TypeScript;
-   **Tecnologia:** Node.js;
-   **Framework:** Express.js e Prisma ORM;
-   **Banco de Dados:** PostgreSQL;
-   **Documentação:** Swagger.

## Estrutura do Projeto

-   **Organização de pastas:**
-   **@types:** Contém todas as tipagens necessárias para as várias partes da aplicação;
-   **prisma:** Contém o modelo para cada tabela e seus respectivos dados. Também contém todas as migrations que são realizadas para o banco de dados;
-   **src:** Aqui vão estar as pastas: controllers, middlewares, routes, services. Também vai ter o arquivo index.ts(responsável por iniciar o servidor) e o swagger.ts(responsável por criar a estrutura da página de documentação)

-   **Endpoints:**
-   **sawgger:** /api-docs
    obs: Com o endpoint acima, é possível visualizar todos os outros endpoints que a aplicação oferece, juntamente com as especificações detalhadas de cada um

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/leofrs/backEnd-master
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o banco de dados(junto com as migrations) e as variáveis de ambiente no arquivo `.env`. Para tirar suas dúvidas, vá no arquivo `.env.example`.

4. Inicie o servidor:

    ```bash
    npm run dev
    ```

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para dúvidas ou suporte, entre em contato com [leofrrodrigues86@gmail.com](mailto:leofrrodrigues86@gmail.com).

---
