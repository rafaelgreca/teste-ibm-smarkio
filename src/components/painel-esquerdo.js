import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

/*
Estilização dos elementos da página  utilizando CSS
*/
const DivPainelEsquerdo = styled.div`
background-color: transparent;
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
padding: 0 9rem;
margin-top: -8.8rem;

@media screen and (max-width: 768px){
    margin-top: 0;
    padding: 2rem 5rem;
}
`;

const DivCampos = styled.div`
background-color: transparent;
justify-content: space-around;
text-align: center;
align-items: left;
padding: 0;
`;

const Comentario = styled.h3`
text-transform: capitalize;
color: #000;
text-align: left;
padding-left: 0.4rem;
margin-bottom: 0.3rem;
`;

const TextoComentario = styled.textarea`
cursor: text;
border: 1px solid #000;
cursor: text;
margin: 0.5rem;
width: 21rem;
height: 7.5rem;
resize: none;

@media screen and (max-width: 768px){
    margin: 0.5rem 0;
    width: 100%;
}
`;

const BotaoAddComentario = styled.button`
cursor: pointer;
padding: 0.9rem;
background-color: #b97065;
width: 95%;
border: 1px solid #000;
font-weight: bolder;
border-radius: 6px;

&:hover{
    color: rgb(255, 255, 255);
    transition-timing-function: ease-out;
    transition-delay: 0.2s;
    transition-duration: 1s;
}

@media screen and (max-width: 768px){
    margin-top: 0.5rem;
    margin-bottom: 0;
    width: 100%;
}
`;

class PainelEsquerdo extends React.Component{
  
    constructor(props){
      super(props);
      this.state = {comentario : ''};

      this.changeComentario = this.changeComentario.bind(this);
      this.cadastrarComentario = this.cadastrarComentario.bind(this);
    }

    //Atualiza o valor da variável 'comentário'
    changeComentario(event){
        const target = event.target;
        const value = target.value;

        this.setState({comentario : value});
    }

    //Cadastra o comentário no banco de dados
    cadastrarComentario(event){

        const data = {
            'conteudo' : this.state.comentario
        }
        
        if(this.state.comentario !== ''){
            try{
                axios.post('http://localhost:3001/comentarios/add', data)
                .then(() => {
                    alert("Comentário inserido com sucesso!");
                    this.setState({comentario : ''});
                })
                .catch(() => {
                    //console.log("Erro ao inserir o comentário!");
                });
            }
            catch(e){
                alert(e);
            }
        }
    }

    render(){
  
      return (

          <DivPainelEsquerdo>
              
              <Comentario>
                  Comentário
              </Comentario>

              <DivCampos>

              <TextoComentario type="text" value={this.state.comentario} onChange={this.changeComentario} />

              <BotaoAddComentario type="button" onClick={this.cadastrarComentario}>
                Cadastrar
              </BotaoAddComentario>
              </DivCampos>

          </DivPainelEsquerdo>
      );
    }
  }
  
  export default PainelEsquerdo;