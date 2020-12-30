import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

/*
Estilização dos elementos da página utilizando CSS
*/
const DivPainelDireito = styled.div`
background-color: transparent;
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
padding: 9rem 5rem 4rem 5rem;
width: 100%;
border-left: 3px solid #000;

@media screen and (max-width: 768px){
    padding: 3rem 0;
    border-left: none;
    border-top: 3px solid #000;
}
`;

const ComentarioTitulo = styled.h3`
text-transform: capitalize;
color: #000;
font-weight: bolder;
text-align: left;

@media screen and (max-width: 768px){
    padding-left: 4rem;
}
`;

const ComentarioTexto = styled.p`
color: #000;
font-weight: normal;
margin-right: 1.8rem;
text-align-last: left;
`;

const DivComentariosCadastrados = styled.div`
text-align: left;
overflow-y: auto;
height: 25rem;

@media screen and (max-width: 768px){
    height: 20rem;
    padding: 0;
    margin: 0 2rem 0 4rem;
}
`;

const DivComentario = styled.div`
margin: 1.5rem 0;
display: flex;
flex-direction: row;
justify-content: space-between;

@media screen and (max-width: 768px){
    margin: 0 0;
}
`;

const DivComentarioTexto = styled.div`
width: 25rem;
word-break: break-all;
`;

const BotaoOuvir = styled.button`
cursor: pointer;
padding: 0.7rem;
background-color: #b97065;
height: 3rem;
width: 5rem;
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
    margin-top: 0.7rem;
    margin-bottom: 1rem;
    height: 2rem;
    width: 6rem;
    padding: 0.4rem;
}
`;

class PainelDireito extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {'listaComentarios': []};

        this.onClickOuvir = this.onClickOuvir.bind(this);
    }

    //Pega todos os comentários cadastrados no banco de dados
    getComentarios(){

        try{
            axios.get('http://localhost:3001/comentarios/get')
            .then(res => {
                this.setState({
                    listaComentarios: res.data
                });
            })
            .catch(() => {
               alert("Erro ao tentar pegar os comentários!");
            });
        }
        catch(e){
            console.log(e);
        }
    }

    //Seleciona o comentário que será transformado em uma fala
    //E chama a rota responsável pela ação
    onClickOuvir(event){

        const target = event.target;
        const value = target.value;

        const data = {
            'texto': value
        }

        try{
            axios.post('http://localhost:3001/comentarios/get/audio', data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    
        }
        catch(e){
            console.log(e);
        }

    }

    //Toda vez que a página for inicilizada, a função de pegar os comentários
    //Do banco será chamada
    componentDidMount(){
        this.getComentarios();
    }

    //Toda vez que a página for atualizada, a função de pegar os comentários
    //Do banco será chamada. Para que a inserção de comentários na lista seja
    //Feita em tempo real
    componentDidUpdate(){
        this.getComentarios();
    }

    render(){
  
      return (
          <DivPainelDireito>

              <ComentarioTitulo>
                  Comentários
              </ComentarioTitulo>

              <DivComentariosCadastrados>

                    {this.state.listaComentarios.map((comentario) => 
                        <DivComentario>
                            <DivComentarioTexto>
                                <ComentarioTexto>{comentario.conteudo}</ComentarioTexto>
                            </DivComentarioTexto>
                            <BotaoOuvir value={comentario.conteudo} onClick={this.onClickOuvir}>Ouvir</BotaoOuvir>
                        </DivComentario>      
                    )}

              </DivComentariosCadastrados>

          </DivPainelDireito>
      );
    }
  }
  
  export default PainelDireito;