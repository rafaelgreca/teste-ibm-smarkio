import PainelEsquerdo from './components/painel-esquerdo';
import PainelDireito from './components/painel-direito';
import styled from 'styled-components';

/*
Estilização dos elementos da página utilizando CSS
*/
const Painel = styled.div`
background-color: transparent;
display: flex;
flex-direction: row;
justify-content: center;
text-align: center;
align-items: center;
padding: 0;
margin: 0;

@media screen and (max-width: 768px){
  flex-direction: column;
}
`;

function App() {
  return (
    <Painel>

      <PainelEsquerdo />
      <PainelDireito />

    </Painel>
  );
}

export default App;