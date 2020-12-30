/*
Configurações necessárias para fazer a API Watson IBM,
o banco de dados e o servidor back-end funcionar
*/
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'watsonibm'
});
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const player = require('play-sound')(opts = {})

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'oK7pWnrU4Up7jJVS_qPMd7Yt6baYVtbTTeu57U1WmUac' }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e1e8b38e-27b3-42b8-b42a-70eb0c12daf5'
});

connection.connect((err) => {
    if (err) {
      console.log('Erro ao conectar no banco de dados!', err);
    }
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

/*
Declaração das rotas
*/

//Adiciona comentário no banco de dados
app.post("/comentarios/add", (req, res) => {
    
    const comentario = req.body.conteudo;
    const sql = 'INSERT INTO comentarios (conteudo) VALUES (?)';

    connection.query(sql, [comentario], (err, result) => {
        
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

//Retorna todos os comentários diferentes (evita mostrar comentário repetido)
//do banco de dados
app.get("/comentarios/get", (req, res) => {

    const sql = 'SELECT DISTINCT conteudo FROM comentarios';

    connection.query(sql, (err, result) => {
        
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
        
    })
});

//Utiliza a API Watson IBM para transformar um determinado comentário
//em uma fala
app.post("/comentarios/get/audio", (req, res) => {

    const texto = req.body.texto;

    const params = {
        text: texto,
        voice: 'pt-BR_IsabelaV3Voice',
        accept: 'audio/wav'
    };

    textToSpeech
        .synthesize(params)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(audio => {
            fs.writeFileSync('audio.wav', audio);

            player.play('audio.wav', function(err) {
                if(err){
                    console.log(err);
                }
            });

            fs.unlinkSync('audio.wav');
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001.");
});