import { useContext, useState } from "react";
import Context from "../../Context/Context";
import styled from "styled-components";

import trofeu from "../../assets/images/trofeu.png";

export default function RankingWindow() {
  const { token } = useContext(Context);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <Titulo>
        <img src={trofeu} alt="Troféu" />
        <h1>Ranking</h1>
      </Titulo>
      <Classificacao>
        <p>1. Fulaninha - 32 links - 1.703.584 visualizações</p>
        <p>2. Ciclano - 20 links - 1.113.347 visualizações</p>
        <p>3. Beltrana - 18 links - 852.961 visualizações</p>
        <p>4. Joaozin - 14 links - 492.173 visualizações</p>
        <p>
          5. DEFINITIVAMENTE_NAO_E_UM_BOT - 12345252 links - 37.707
          visualizações
        </p>
      </Classificacao>
      {!isLogged ? (
        <TextoLogar>
          <h2>Crie sua conta para usar nosso serviço!</h2>
        </TextoLogar>
      ) : (
        <div></div>
      )}
    </>
  );
}

const Titulo = styled.div`
  margin-top: 250px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 50px;
    margin-right: 20px;
  }

  h1 {
    font-size: 36px;
    font-weight: bold;
  }
`;

const Classificacao = styled.div`
  width: 70%;
  margin: 20px auto;
  border: 1px solid var(--cor-borda-input);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

  p {
    line-height: 35px;
  }
`;

const TextoLogar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;

    h2{
        font-size: 30px;
        font-weight: bold;
    }
`
