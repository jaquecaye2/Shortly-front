import styled from "styled-components";

import trash from "../../assets/images/trash.png";

export default function MyUrlsWindow() {
  return (
    <>
      <EncurtarUrl>
        <form>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Links que cabem no bolso"
          />
          <button>Encurtar link</button>
        </form>
      </EncurtarUrl>
      <MinhasUrls>
        <URL>
          <div className="infoUrl">
            <p className="link">https://www.driven.com.br</p>
            <p>e4231A</p>
            <p>Quantidade de visitantes: 271</p>
          </div>
          <div className="deletarUrl">
            <img src={trash} alt="excluir item" />
          </div>
        </URL>
        <URL>
          <div className="infoUrl">
            <p className="link">https://www.globo.com.br</p>
            <p>bt24kS</p>
            <p>Quantidade de visitantes: 03</p>
          </div>
          <div className="deletarUrl">
            <img src={trash} alt="excluir item" />
          </div>
        </URL>
        <URL>
          <div className="infoUrl">
            <p className="link">
              https://br.freepik.com/fotos-gratis/nuvem-download-icon-line-conexao-da-placa-de-circuito_1198388.htm#query=link%20grande&position=0&from_view=keyword
            </p>
            <p>59sitA</p>
            <p>Quantidade de visitantes: 03</p>
          </div>
          <div className="deletarUrl">
            <img src={trash} alt="excluir item" />
          </div>
        </URL>
      </MinhasUrls>
    </>
  );
}

const EncurtarUrl = styled.div`
  width: 70%;
  margin: 250px auto 0 auto;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  input {
    width: 75%;
    height: 60px;
    border: 1px solid var(--cor-borda-input);
    border-radius: 12px;
    font-size: 14px;
    color: var(--cor-texto-input);
    padding: 0 20px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  }

  button {
    margin-left: 20px;
    width: 20%;
    height: 60px;
    border: none;
    background-color: var(--cor-button);
    color: var(--cor-fundo);
    font-size: 14px;
    font-weight: bold;
    border-radius: 12px;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

const MinhasUrls = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const URL = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  div.infoUrl {
    width: 87%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: var(--cor-detalhes);
    border-radius: 12px 0 0 12px;

    p {
      color: var(--cor-fundo);
      font: 14px;
      font-weight: 400;
      height: 15px;
      width: 30%;
      text-align: center;
      overflow: hidden;
    }
  }

  div.deletarUrl {
    background-color: var(--cor-fundo);
    border: 1px solid var(--cor-borda-input);
    width: 13%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 12px 12px 0;

    img {
      width: 30px;
    }

    :hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`;
