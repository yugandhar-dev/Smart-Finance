import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { InvestmentWithdraw, getUserDetails } from "../../auth/index";
import { useWallet } from "../../context/wallet";


const Content = styled.div`
width: 80vw;
height: 100%;
position: center;
`;

const Input = styled.input`
width: 10%;
border-shadow: none;
text-align: Left;
border-radius:8px;
padding: 10px;
onclick-border: none;
margin-bottom: 10px;
`;

const Button = styled.button`
    width: 15%;
    background-color:#07236a;
    border-radius:10px;
    Margin-top: 5px;
    padding:10px;
    border-shadow: none;
    border:none;
    color:white;
    position: right;
    cursor: pointer;
}
:hover {
  background-color: #07236a;
}
:disabled {
  background-color: grey;
}
`;

export default (props) => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [walletAmount, setWalletAmount] = useState('');
  const {walletReload, setWalletReload} = useWallet();

  useEffect(() => {
    getUserDetails()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResponse(data[0]);
        }
      })
      .catch((ex) => console.log("Fund Details Retrieval error", ex));
  }, [response]);

  const withdrawAmount = async () => {
    const userDetails = await getUserDetails();
    const data = {
      accountNumber: userDetails[0].accountNumber,
      walletAccountNumber: userDetails[0].walletAccountNumber,
      walletFund: walletAmount,
    };
    setResponse(await InvestmentWithdraw(data));
    setWalletReload(!walletReload)
    props.setReload(!props.reload)
    console.log(response, "string")
  };

  const validateInput = () =>
    parseFloat(walletAmount) <= 0 || walletAmount == ''

  return (
    <Content>
      <p>Account number:{JSON.stringify(response.accountNumber)}</p>
      <p>Enter the amount you want to withdraw
            <Input type="text" value={walletAmount}
          onChange={event => setWalletAmount(event.target.value)}></Input> </p><br></br>
      <Button onClick={withdrawAmount} disabled={validateInput()}>Withdraw</Button>
      <Button margin-left="40%">Reset</Button>
    </Content>
  )
}