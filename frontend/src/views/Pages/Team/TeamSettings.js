import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../Layouts/Container";
import Header from "../../Layouts/Header";
import { API } from "../../../utils/axios";

const TeamSettings = (props) => {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    checkBalance();
  }, []);

  const checkBalance = () => {
    API.get(`/agreements/balance/${props.account.team_list[0].balance[0].id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("clairovoyanceToken")}`,
      },
    }).then((res) => setBalance(res.data), setLoading(false));
  };

  return (
    <React.Fragment>
      {loading ? null : (
        <React.Fragment>
          <Header title={``}></Header>
          <Container singleCol={true}>
            {props.account.team_list[0].name}
          </Container>
          <br />
          {props.account.team_list[0].users.map((user) => (
            <div>{user.username}</div>
          ))}
          <br />
          <div>Balance: {balance ? balance.balance : 0}</div>
          <div
            onClick={() => checkBalance()}
            style={{ cursor: "pointer", color: "red" }}
          >
            Check Balance
          </div>
          <div>Last Checked: {balance ? balance.last_checked : null}</div>
          <br />
          <div>Agreements</div>
          {props.account.team_list[0].agreements.map((agreement) => (
            <div>
              User: {agreement.user} | Amount: {agreement.value} | Interval:{" "}
              {agreement.interval}
            </div>
          ))}
          <br />
          <div>Transactions</div>
          <div
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => setShowTransactions(!showTransactions)}
          >
            {showTransactions ? "Hide Transactions" : "Show Transactions"}
          </div>
          {balance && showTransactions
            ? balance.transactions.map((transaction) => (
                <div>
                  User: {transaction.user}, Value: {transaction.value},
                  Transaction Date: {transaction.transaction_date}
                </div>
              ))
            : null}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     null,
//   };
// };

export default connect(mapStateToProps)(TeamSettings);
