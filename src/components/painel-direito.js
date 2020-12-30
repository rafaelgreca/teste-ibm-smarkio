import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DivPainelDireito = styled.div`
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

const ComentarioTitulo = styled.h3`
text-transform: capitalize;
color: #000;
`;

const DivComentariosCadastrados = styled.div`
`;

const DivComentario = styled.div`
`;

const BotaoOuvir = styled.button`
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

class PainelDireito extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {'listaComentarios': []};

        this.onClickOuvir = this.onClickOuvir.bind(this);
    }

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
    componentDidMount(){
        this.getComentarios();
    }

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

                  <DivComentario>

                    <ul>
                    {this.state.listaComentarios.map((comentario) => 
                        <li key={comentario.id + comentario.conteudo}>{comentario.conteudo} <button value={comentario.conteudo} onClick={this.onClickOuvir}>Ouvir</button></li>      
                    )}
                    </ul>

                  </DivComentario>

              </DivComentariosCadastrados>

          </DivPainelDireito>
      );
    }
  }
  
  export default PainelDireito;