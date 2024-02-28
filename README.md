
# Booked

O "Booked"é uma proposta de plataforma web dedicada aos amantes de livros, oferecendo um espaço onde os utilizadores podem partilhar opiniões, avaliações e descobrir novas inspirações. Este projeto visa integrar dados de livros de diversas fontes, proporcionando um ambiente interativo e enriquecedor para os seus utilizadores.



## Funcionalidades

- Interface amigável e intuitiva.
- Funcionalidades de avaliação, comentários.
## Instalação

### Front-end
Para instalar o Node.js e o npm (Node Package Manager) em seu sistema é necessário seguir alguns passos:
1. Acesse o site oficial do Node.js em https://nodejs.org/.
2. Faça o download da versão mais recente do Node.js para o seu sistema operacional (Windows, macOS, Linux).
3. Após o download, execute o instalador e siga as instruções na tela para concluir a instalação.
4. Depois de instalado, abra o terminal ou prompt de comando e digite node -v para verificar se o Node.js foi instalado corretamente. Isso mostrará a versão do Node.js instalada.
5. Para verificar a instalação do npm, digite npm -v no terminal. Isso mostrará a versão do npm instalada.
6. No terminal da pasta do projeto executar os seguintes comandos:
```bash
  npm install
  npm start
```
Se tudo estiver correto abrirá uma nova aba no seu navegador com o site.
### Back-end
1. Navegar até ao diretório server pelo terminal:

```bash
cd server
```

2. Ainda no terminal executar o seguinte comando para iniciar o servidor:

```bash
npm run dev
```

Se tudo estiver correto no terminal irá indicar a porta que o back-end irá usar que será a 5015.

### Resolução de problemas

Dependendo de onde executar o comando `npm install` não serão instalados os devidos modules portanto os módulos usados são:

#### Express

```bash
npm install express
```

#### Cors

```bash
npm install cors
```

#### MySQL2

```bash
npm install mysql2
```

#### JWT

```bash
npm install jsonwebtoken
```

Caso seja preciso instalar outro modulo pode ainda executar o seguinte comando `npm install name_module`.

## Importante 

O site não funciona sem ser liberado o seu IP, caso não o tenha feito envie o seu endereço IP  para um dos desenvolvedores para que senha liberado o acesso ao site da base de dados.
