import { useContext } from "react";
import Context from "../../Context/Context";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import trofeu from "../../assets/images/trofeu.png";

function Ranking({ posicao, url }) {
  return (
    <p>
      {posicao + 1}. {url.name} - {url.linksCount} links - {url.visitCount} visualizações
    </p>
  );
}

export default function RankingWindow() {
  const { token } = useContext(Context);
  const [isLogged, setIsLogged] = useState(false);
  const [urlsRanking, setUrlsRanking] = useState([]);

  useEffect(() => {
    if (token.length !== 0) {
      setIsLogged(true);
    }
  }, [token]);

  function renderizarUrls() {
    const promise = axios.get("https://back-shortly-jc.herokuapp.com/ranking");

    promise
      .then((response) => {
        console.log(response.data);
        setUrlsRanking(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  useEffect(() => {
    renderizarUrls();
  }, []);

  return (
    <>
      <Titulo>
        <img src={trofeu} alt="Troféu" />
        <h1>Ranking</h1>
      </Titulo>

      {urlsRanking.length === 0 ? (
        <Classificacao>
          <p>Não há URLs cadastradas</p>
        </Classificacao>
      ) : (
        <Classificacao>
          {urlsRanking.map((url, index, posicao) => (
            <Ranking key={index} posicao={index} url={url} />
          ))}
        </Classificacao>
      )}

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

  h2 {
    font-size: 30px;
    font-weight: bold;
  }
`;
