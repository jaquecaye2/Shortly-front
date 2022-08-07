import { useContext, useState } from "react";
import Context from "../../Context/Context";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../../assets/images/short.png";

export default function Header() {
  const { token } = useContext(Context);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <HeaderEstilo>
      {!isLogged ? (
        <LinkNaoLogado>
          <Link to="/signin">
            <p>Entrar</p>
          </Link>
          <Link to="/signup">
            <p>Cadastrar-se</p>
          </Link>
        </LinkNaoLogado>
      ) : (
        <LinkLogado>
          <div>
            <p>Seja bem-vindo(a), Pessoa!</p>
          </div>
          <div className="links">
            <Link to="/myurls">
              <p>Home</p>
            </Link>
            <Link to="/">
              <p>Ranking</p>
            </Link>
            <a>
              <p>Sair</p>
            </a>
          </div>
        </LinkLogado>
      )}
      <Logo>
        <Link to="/">
          <h1>Shortly</h1>
          <img src={logo} alt="Logo" />
        </Link>
      </Logo>
    </HeaderEstilo>
  );
}

const HeaderEstilo = styled.header`
  background-color: var(--cor-fundo);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 30px 170px;
`;

const LinkNaoLogado = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  a {
    margin: 0 10px;
    text-decoration: none;
    color: #9c9c9c;

    p {
      font-size: 14px;
    }

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

const LinkLogado = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    color: #5d9040;
    font-size: 14px;
  }

  div.links {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    margin: 0 10px;
    text-decoration: none;
    color: #9c9c9c;

    p {
      font-size: 14px;
    }

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

const Logo = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  a{
    text-decoration: none;
    color: var(--cor-texto);
    display: flex;
  }

  h1 {
    font-size: 64px;
    font-weight: 200;
    margin-right: 20px;
  }

  img {
    width: 102px;
  }
`;
