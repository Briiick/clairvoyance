import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { updateAccount } from '../../store/actions_creators';

// set up header for blog
const Export = (props) => {

  const [menuToggle, setMenu] = useState(false);
  
  function logOut() {
    props.updateAccount(null);
    localStorage.removeItem('loggedIn');
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content="Clairvoyance, an accountability blog." />
      </Helmet>
      <Header menuToggle={menuToggle}>
        <Container className="content">
          <div className="logo">
            <Link className="logo-text" to="/">Clairvoyance</Link>
          </div>
          <div className="menu">
            <Link className="item" to="/timeline">Timeline</Link>
            {props.account === null ? <Link className="item" to="/auth/login">Login</Link> : null}
            {props.account === null ? <Link className="item" to="/auth/register">Register</Link> : null}
            {props.account !== null && props.account.admin != null ? <Link className="item" to={`/post-article`}>Add Article</Link>  : null}
            {props.account !== null ? <Link className="item" to="/analytics">Analytics</Link> : null}
            {props.account !== null ? <Link className="item" to="/team">Team</Link> : null}
            {props.account !== null ? <Link className="item" to="/profile">Profile</Link> : null}
            {props.account !== null ? <div className="item" onClick={logOut}>Log out</div> : null}
          </div>
          <div onClick={() => { setMenu(!menuToggle) }} className="menu-button">
            <i className="fa fa-bars"></i>
          </div>
        </Container>
      </Header>
    </React.Fragment>
  )

}

// saving dispatch and state to props
const mapDispatchToProps = (dispatch) => {
  return {
		updateAccount: (data) => {
			dispatch(updateAccount(data))
    } 
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

// export header
export default connect(mapStateToProps, mapDispatchToProps)(Export);

let Header = styled.div`
  background: #000000;
  margin-bottom: 20px;
  @media (max-width: 1100px) {
    margin-bottom: 15px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    .logo {
      order: 1;
      flex-basis: 30%;
      height: 65px;
      display: flex;
      align-items: center;
      .logo-text {
        color: #fff;
        font-weight: bold;
        font-size: 20px;
      }
    }
    .menu {
      order: 2;
      flex-basis: 60%;
      display: flex;
      @media (max-width: 1100px) {
        ${props => props.menuToggle === true ? `
        display: flex;
        .item {
          animation: showItems 0.5s;
        }
      ` : `
        display: none;
      `}
      }

      justify-content: flex-end;
      overflow: hidden;
      .item {
        font-size: 14px;
        font-weight: bold;
        margin-right: 20px;
        color: #fff;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          color: #cacaca;
        }
      }
      @media (max-width: 1100px) {
        margin-bottom: 10px;
        order: 3;
        flex-basis: 100%;
        align-items: flex-start;
        flex-direction: column;
        background: #a94e4e;
        padding: 0;
        .item {
          height: 50px;
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-top: solid 1px rgba(255, 255, 255, 0.08);
          width: 100%;
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
    .menu-button {
      order: 3;
      display: none;
      @media (max-width: 1100px) {
        order: 2;
        display: flex;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  @keyframes showItems {
    0% {
      opacity: 0;
      height: 0;
    }
    100% {
      opacity: 1;
      height: 50px;
    }
  }
`;
