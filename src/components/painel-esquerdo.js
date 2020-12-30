import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DivPainelEsquerdo = styled.div`
background-color: transparent;
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
align-items: center;
padding: 10rem;

@media screen and (max-width: 768px){
    padding: 5rem;
}
`;

const Comentario = styled.h3`
text-transform: capitalize;
color: #000;
`;

const TextoComentario = styled.textarea`
resize: none;
cursor: text;
border: 1px solid #000;
cursor: text;
margin: 0.5rem;
width: 100%;
heigth: 10rem;

@media screen and (max-width: 768px){
    margin: 0.5rem 1.5rem;
    width: 100%;
}
`;

const BotaoAddComentario = styled.button`
cursor: pointer;
padding: 0.9rem;
background-color: transparent;

&:hover{
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    transition-timing-function: ease-out;
    transition-delay: 0.2s;
    transition-duration: 1s;
}

@media screen and (max-width: 768px){
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
}
`;

class PainelEsquerdo extends React.Component{
  
    constructor(props){
      super(props);
      this.state = {comentario : ''};

      this.changeComentario = this.changeComentario.bind(this);
      this.cadastrarComentario = this.cadastrarComentario.bind(this);
    }

    changeComentario(event){
        const target = event.target;
        const value = target.value;

        this.setState({comentario : value});
    }

    cadastrarComentario(event){

        const data = {
            'conteudo' : this.state.comentario
        }
        
        try{
            axios.post('http://localhost:3001/comentarios/add', data)
            .then(() => {
                alert("Comentário inserido com sucesso!");
                this.setState({comentario : ''});
            })
            .catch(() => {
                alert("Erro ao inserir o comentário!");
            });
        }
        catch(e){
            console.log(e);
        }
    }

    render(){
  
      return (

          <DivPainelEsquerdo>

              <Comentario>
                  Comentário
              </Comentario>

              <TextoComentario type="text" value={this.state.comentario} onChange={this.changeComentario} />

              <BotaoAddComentario onClick={this.cadastrarComentario}>
                  Cadastrar
              </BotaoAddComentario>

          </DivPainelEsquerdo>
      );
    }
  }
  
  export default PainelEsquerdo;