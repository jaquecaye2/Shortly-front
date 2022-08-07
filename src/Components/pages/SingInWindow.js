import { useContext } from "react";
import Context from "../../Context/Context.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SingInWindow() {
  const { setToken } = useContext(Context);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [corBackgroundInput, setCorBackgroundInput] = React.useState("#ffffff");
  const [carregando, setCarregando] = React.useState(false);

  const navigate = useNavigate();

  function submitForm(event) {
    event.preventDefault();

    setDisabled(true);
    setCorBackgroundInput("#f2f2f2");
    setCarregando(true);

    const dadosLogin = {
      email,
      password: senha
    };

    const promise = axios.post(
      "https://back-shortly-jc.herokuapp.com/signin",
      dadosLogin
    );

    promise
      .then((response) => {
        setToken(response.data);
        alert("Bem vindo(a)!")
        navigate("/myurls");
      })
      .catch((error) => {
        alert(error.response.data);
        setEmail("");
        setSenha("");
        setDisabled(false);
        setCorBackgroundInput("#ffffff");
        setCarregando(false);
      });
  }

  return (
    <FormStyle onSubmit={submitForm} corBackgroundInput={corBackgroundInput}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disabled}
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        disabled={disabled}
        required
      />
      {carregando ? (
        <button disabled={disabled}>
          <ThreeDots color="#ffffff" height={45} width={80} />
        </button>
      ) : (
        <button disabled={disabled}>Entrar</button>
      )}
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin-top: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    margin-bottom: 25px;
    width: 60%;
    height: 60px;
    border: 1px solid var(--cor-borda-input);
    border-radius: 12px;
    font-size: 14px;
    color: var(--cor-texto-input);
    padding: 0 20px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    background-color: ${(props) => props.corBackgroundInput};
  }

  button {
    margin-top: 30px;
    width: 180px;
    height: 50px;
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
