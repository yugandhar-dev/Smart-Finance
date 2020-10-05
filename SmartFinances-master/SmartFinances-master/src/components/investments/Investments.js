import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import { Wallet } from "@styled-icons/entypo/Wallet";
import { Calculator } from "@styled-icons/boxicons-solid/Calculator";
import { Funds } from "@styled-icons/remix-fill/Funds";
import { HandHoldingUsd } from "@styled-icons/fa-solid/HandHoldingUsd";
import { MoneyCheckAlt } from "@styled-icons/fa-solid/MoneyCheckAlt";
import { Plus } from "@styled-icons/evaicons-solid/Plus";
import { Minus } from "@styled-icons/boxicons-regular/Minus";
import Addfunds from "./Addfunds";
import Lowrisk from "./Lowrisk";
import Withdraw from "./Withdraw";
import Sell from "./sell/sell";
import InvestmentCalculator from "./Calculator/Calculator";
import LowRiskInvestment from "./lowRiskInvestment";
import ETF from "./ETFs/ETF";
import SavingScheme from "./SavingSchemes/savingScheme";

const MainDiv = styled.div`
  background-color: #3f51b5;
  height: 100vh;
  width: 20%;
  padding-top: 40vh;
  position: absolute;
  left: 0;
  top: 0;
`;

const ChildDiv = styled.div`
  margin-left: 30%;
`;

const CategoriesDiv = styled.div`
  color: white;
  padding: 0.5rem;
  width: 80%;
  text-align: start;
  margin: auto;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(233, 227, 227, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background-color: white;
    color: #3f51b5;
    border-radius: 1rem;
  }
  ${props =>
    props.subCategory &&
    css`
      width: 60%;
      font-size: 1rem;
      border-bottom: 1px solid white;
      border-radius: 0;
    `}
`;

function Investments(props) {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("");

  const getForm = e => {
    setDisplay(e.target.getAttribute("name"));
    if (open) setOpen(!open);
  };

  const changeStyle = {
    backgroundColor: "white",
    color: "#07236a",
  };

  const dropDown = (
    <div>
      <CategoriesDiv
        subCategory
        name="lowrisk"
        onClick={() => setDisplay("lowrisk")}
        style={display === "lowrisk" ? changeStyle : {}}
      >
        Low Risk
      </CategoriesDiv>
      <CategoriesDiv
        subCategory
        name="etfs"
        onClick={() => setDisplay("etfs")}
        style={display === "etfs" ? changeStyle : {}}
      >
        Exchange Traded Funds
      </CategoriesDiv>
      <CategoriesDiv
        subCategory
        name="schemes"
        onClick={() => setDisplay("schemes")}
        style={display === "schemes" ? changeStyle : {}}
      >
        Savings Schemes
      </CategoriesDiv>
    </div>
  );

  return (
    <Fragment>
      <MainDiv style={{ position: "fixed" }}>
        <CategoriesDiv
          name="add"
          onClick={e => getForm(e)}
          style={display === "add" ? changeStyle : {}}
        >
          <Wallet size="35" /> Add Funds to Wallet
        </CategoriesDiv>
        <CategoriesDiv
          onClick={e => {
            setOpen(!open);
            getForm(e);
          }}
          style={open ? { backgroundColor: "#8598c9", color: "#07236a" } : {}}
        >
          <Funds size="35" id = "Invest" /> Invest
          {open ? (
            <Minus size="35" style={{ float: "right" }} />
          ) : (
            <Plus size="35" style={{ float: "right" }} />
          )}
        </CategoriesDiv>
        {open && dropDown}
        <CategoriesDiv
          name="sell"
          onClick={e => getForm(e)}
          style={display === "sell" ? changeStyle : {}}
        >
          <HandHoldingUsd size="35" /> Sell Investments
        </CategoriesDiv>
        <CategoriesDiv
          name="withdraw"
          onClick={e => getForm(e)}
          style={display === "withdraw" ? changeStyle : {}}
        >
          <MoneyCheckAlt size="35" /> Withdraw Money
        </CategoriesDiv>
        <CategoriesDiv
          name="calculator"
          onClick={e => getForm(e)}
          style={display === "calculator" ? changeStyle : {}}
        >
          <Calculator size="35" /> Investment Calculator
        </CategoriesDiv>
      </MainDiv>
      <ChildDiv>
        {display === "add" && (
          <Addfunds reload={props.reload} setReload={props.setReload} />
        )}
        {display === "lowrisk" && (
          <Lowrisk reload={props.reload} setReload={props.setReload} />
        )}
        {display === "etfs" && (
          <ETF reload={props.reload} setReload={props.setReload} />
        )}
        {display === "schemes" && (
          <SavingScheme reload={props.reload} setReload={props.setReload} />
        )}
        {display === "sell" && (
          <Sell reload={props.reload} setReload={props.setReload} />
        )}
        {display === "withdraw" && (
          <Withdraw reload={props.reload} setReload={props.setReload} />
        )}
        {display === "calculator" && <InvestmentCalculator />}
      </ChildDiv>
    </Fragment>
  );
}

export default Investments;
