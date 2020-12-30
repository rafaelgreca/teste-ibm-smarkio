import './App.css';
import PainelEsquerdo from './components/painel-esquerdo';
import PainelDireito from './components/painel-direito';
import styled from 'styled-components';

const Painel = styled.div`
background-color: transparent;
display: flex;
flex-direction: row;
justify-content: center;
text-align: center;
align-items: center;

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