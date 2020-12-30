# Teste Prático de Programação - SMARKIO

## Frameworks e Ferramentas utilizados(as)

* ReactJS com a biblioteca Styled Components
* NodeJS
* Express
* Watson IBM API
* Axios como AJAX (do ReactJS)
* MySQL
* Git
* Visual Studio Code

## Como executar

### Pré-requisitos
Antes de executar, é necessário ter o MySQL instalado no seu ambiente local. Se já tiver, ou depois que estiver instalado, crie um banco de dados com o nome **watsonibm** e, dentro dele, crie uma tabela com o nome **comentarios**. Ambos podem ser criados utilizando os seguintes comandos SQL:

```sql
CREATE DATABASE watsonibm;
```

```sql
CREATE TABLE comentarios (id INT AUTO_INCREMENT PRIMARY KEY, conteudo TEXT(300) NOT NULL;
```

Para instalar os arquivos, caso tenha o Git instalado no ambiente local, utilize o seguinte comando:

```git
git clone https://github.com/rafaelgreca/teste-ibm-smarkio.git
```

Caso não tenha, clique no botão verde escrito "Code" e instale como zip. Extraia o mesmo depois que baixar.

## Execução

Depois de já ter realizado os passos anteriores, abra dois terminais dentro do endereço da pasta. Um será utilizada para rodar o servidor e o outro o cliente. Para executar o servidor, devemos entrar na pasta **server** e usar o comando "node index.js". Para executar o cliente, basta utilizar o comando "npm start". Ambos os comandos estão demonstrados na figura abaixo.

![Comandos de execução do cliente e do servidor](images/comandos.png)

Acesse o link [http://localhost:3000](http://localhost:3000) no seu navegador para utilizar a aplicação.

## Configurações

Para trocar as configurações do banco de dados, acesse o arquivo **index.js**, que está dentro da pasta **server**, e modifique as seguintes variáveis:

```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'watsonibm'
});
```

Recomendação: modifique somente as variáveis **user** e **password**.

Para trocar as configurações da API Watson IBM, primeiramente crie uma conta gratuita acessando esse [link](https://www.ibm.com/cloud/watson-text-to-speech). Depois, também dentro do arquivo **index.js**, modifique as seguintes variáveis com as suas credenciais:

```javascript
const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'oK7pWnrU4Up7jJVS_qPMd7Yt6baYVtbTTeu57U1WmUac' }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e1e8b38e-27b3-42b8-b42a-70eb0c12daf5'
});
```