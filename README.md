# Testes E2E com o CodeceptJS

## Introdução
Segue o projeto E2E da aplicação Mark L através do framework Playwright em TypeScript testes Web e API.

### Pré-requisitoss:
* VS Code
* Node.js
* Java 11
* Git e Git Bash

## Como executar o projeto:
* Clonar o projeto na máquina local
* Executar no terminal concernente a automação de teste o comando 'yarn install'
* No terminal concernente ao 'apps' em 'api' e 'web', executar o comando 'yarn dev' para inicializar a aplicação

## Estrututa do projeto
| Diretório            | Finalidade                                                           |
| ---------------------| ---------------------------------------------------------------------|
| ./apps               | Estrutura do projeto em Web e API                                    |
| ./tests/fixtures     | Massa de testes                                                      |
| ./tests/support      | Pages Objects e Helpers para personalizar a massa de teste via API   |
| ./tests              | Cenários de testes                                                   |