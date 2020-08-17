import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Wallet } from "@styled-icons/entypo/Wallet";
import { Calculator } from "@styled-icons/boxicons-solid/Calculator";
import { Funds } from "@styled-icons/remix-fill/Funds";
import { HandHoldingUsd } from "@styled-icons/fa-solid/HandHoldingUsd";
import { MoneyCheckAlt } from "@styled-icons/fa-solid/MoneyCheckAlt";
import { Plus } from "@styled-icons/evaicons-solid/Plus";
import { Minus } from "@styled-icons/boxicons-regular/Minus";

const MainDiv = styled.div`
  background-color: #3f51b5;
  min-height: 70vh;
  width: 25%;
  padding-top: 20vh;
  position: absolute;
  left: 0;
  bottom: 0;
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

const dropDown = (
  <div>
    <CategoriesDiv subCategory>Low Risk</CategoriesDiv>
    <CategoriesDiv subCategory>Exchange Traded Funds</CategoriesDiv>
    <CategoriesDiv subCategory>Savings Schemes</CategoriesDiv>
  </div>
);

function Investments() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <MainDiv>
      <CategoriesDiv onClick={open && toggle}>
        <Wallet size="35" /> Add Funds to Wallet
      </CategoriesDiv>
      <CategoriesDiv
        onClick={toggle}
        style={open ? { backgroundColor: "#8598c9", color: "#07236a" } : {}}
      >
        <Funds size="35" /> Invest
        {open ? (
          <Minus size="35" style={{ float: "right" }} />
        ) : (
          <Plus size="35" style={{ float: "right" }} />
        )}
      </CategoriesDiv>
      {open && dropDown}
      <CategoriesDiv onClick={open && toggle}>
        <HandHoldingUsd size="35" /> Sell Investments
      </CategoriesDiv>
      <CategoriesDiv onClick={open && toggle}>
        <MoneyCheckAlt size="35" /> Withdraw Money
      </CategoriesDiv>
      <CategoriesDiv onClick={open && toggle}>
        <Calculator size="35" /> Investment Calculator
      </CategoriesDiv>
    </MainDiv>
  );
}

export default Investments;
