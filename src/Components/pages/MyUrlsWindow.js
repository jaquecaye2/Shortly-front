import { useContext } from "react";
import Context from "../../Context/Context";
import styled from "styled-components";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";

import trash from "../../assets/images/trash.png";
import openLink from "../../assets/images/open-link.png";

function URLUnica({ url, token, renderizarUrls }) {
  const [carregandoDelete, setCarregandoDelete] = React.useState(false);
  const [carregandoLink, setCarregandoLink] = React.useState(false);

  const customStyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid var(--cor-button)",
      borderRadius: "10px",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function mostrarLink() {
    const promise = axios.get(
      `https://back-shortly-jc.herokuapp.com/urls/${url.id}`
    );

    promise
      .then((response) => {
        openModal();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function excluirLink() {
    setCarregandoDelete(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.delete(
      `https://back-shortly-jc.herokuapp.com/urls/${url.id}`,
      config
    );

    promise
      .then((response) => {
        alert("URL excluída com sucesso!");
        setCarregandoDelete(false);
        renderizarUrls();
      })
      .catch((error) => {
        alert(error.response.data);
        setCarregandoDelete(false);
      });
  }

  function abrirLink() {
    setCarregandoLink(true);

    const promise = axios.get(
      `https://back-shortly-jc.herokuapp.com/urls/open/${url.shortUrl}`
    );

    promise
      .then((response) => {
        setCarregandoLink(false);
        renderizarUrls();
        window.open(url.url, "_blank");
      })
      .catch((error) => {
        alert(error.response.data);
        setCarregandoLink(false);
      });
  }

  return (
    <URL>
      <div className="infoUrl" onClick={mostrarLink}>
        <p alt="Url">{url.url}</p>
        <p>{url.shortUrl}</p>
        <p className="visitCount">{url.visitCount}</p>
      </div>

      {carregandoDelete ? (
        <div className="deletarUrl">
          <ThreeDots color="#80CC74" height={30} width={30} />
        </div>
      ) : (
        <div className="deletarUrl" onClick={excluirLink}>
          <img src={trash} alt="excluir item" />
        </div>
      )}

      {carregandoLink ? (
        <div className="abrirLink">
          <ThreeDots color="#80CC74" height={30} width={30} />
        </div>
      ) : (
        <div className="abrirLink" onClick={abrirLink}>
          <img src={openLink} alt="abrir link" />
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalEstilo>
          <h4>Informações sobre a URL:</h4>
          <p>
            URL: <span>{url.url}</span>
          </p>
          <p>
            URL Encurtada: <span>{url.shortUrl}</span>
          </p>
          <p>
            Quantidade de visitantes: <span>{url.visitCount}</span>
          </p>
          <button onClick={closeModal}>Fechar</button>
        </ModalEstilo>
      </Modal>
    </URL>
  );
}

export default function MyUrlsWindow() {
  const { token, setName } = useContext(Context);

  const [url, setUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [carregando, setCarregando] = React.useState(false);

  const [urlsCadastradas, setUrlsCadastrasdas] = React.useState([]);

  function submitForm(event) {
    event.preventDefault();
    setDisabled(true);
    setCarregando(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const urlEnviada = {
      url,
    };

    const promise = axios.post(
      "https://back-shortly-jc.herokuapp.com/urls/shorten",
      urlEnviada,
      config
    );

    promise
      .then((response) => {
        console.log(response.data);
        setShortUrl(response.data);
        alert("Url encurtada com sucesso!");
        setDisabled(false);
        setCarregando(false);
        setUrl("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
        setDisabled(false);
        setCarregando(false);
        setUrl("");
      });
  }

  function renderizarUrls() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      "https://back-shortly-jc.herokuapp.com/users/me",
      config
    );

    promise
      .then((response) => {
        setUrlsCadastrasdas(response.data.shortenedUrls);
        setName(response.data.name);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  React.useEffect(() => {
    renderizarUrls();
  }, [shortUrl]);

  return (
    <>
      <EncurtarUrl>
        <form onSubmit={submitForm}>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Links que cabem no bolso"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {carregando ? (
            <button disabled={disabled}>
              <ThreeDots color="#ffffff" height={45} width={80} />
            </button>
          ) : (
            <button disabled={disabled}>Encurtar link</button>
          )}
        </form>
      </EncurtarUrl>
      {urlsCadastradas.length === 0 ? (
        <MinhasUrls2>
          <h3>Não há URLs cadastradas</h3>
        </MinhasUrls2>
      ) : (
        <MinhasUrls>
          {urlsCadastradas.map((url, index) => (
            <URLUnica
              key={index}
              url={url}
              token={token}
              renderizarUrls={renderizarUrls}
            />
          ))}
        </MinhasUrls>
      )}
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
    display: flex;
    align-items: center;
    justify-content: center;

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

const MinhasUrls2 = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 18px;
    color: var(--cor-texto-input);
  }
`;

const URL = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  div.infoUrl {
    width: 84%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: var(--cor-detalhes);
    border-radius: 12px 0 0 12px;
    padding: 0 15px;

    p {
      color: var(--cor-fundo);
      font-size: 14px;
      font-weight: 400;
      height: 15px;
      width: 40%;
      text-align: center;
      overflow: hidden;
    }

    p.visitCount {
      width: 20%;
    }

    :hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  div.deletarUrl {
    background-color: var(--cor-fundo);
    border: 1px solid var(--cor-borda-input);
    width: 8%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px;
    }

    :hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  div.abrirLink {
    background-color: var(--cor-fundo);
    border: 1px solid var(--cor-borda-input);
    width: 8%;
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

const ModalEstilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h4 {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    line-height: 25px;

    span {
      font-weight: 200;
    }
  }

  button {
    margin-top: 30px;
    width: 100px;
    height: 30px;
    border: none;
    background-color: var(--cor-button);
    color: var(--cor-fundo);
    font-size: 14px;
    font-weight: bold;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;
