import React, { useState } from "react";
import styled, { css } from "styled-components";

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
  font-size: 1.5rem;
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

  const plusStyle = {
    fontSize: "1rem",
    float: "right",
    paddingTop: "0.5rem",
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <MainDiv>
      <CategoriesDiv onClick={open && toggle}>
        <i className="fas fa-wallet"></i> Add Funds to Wallet
      </CategoriesDiv>
      <CategoriesDiv
        onClick={toggle}
        style={open ? { backgroundColor: "#8598c9", color: "#07236a" } : {}}
      >
        <i class="fas fa-coins"></i> Invest
        {open ? (
          <i className="fas fa-minus" style={plusStyle}></i>
        ) : (
          <i className="fas fa-plus" style={plusStyle}></i>
        )}
      </CategoriesDiv>
      {open && dropDown}
      <CategoriesDiv onClick={open && toggle}>
        <i class="fas fa-hand-holding-usd"></i> Sell Investments
      </CategoriesDiv>
      <CategoriesDiv onClick={open && toggle}>
        <i class="fas fa-download"></i> Withdraw Investments
      </CategoriesDiv>
      <CategoriesDiv onClick={open && toggle}>
        <i class="fas fa-calculator"></i> Investment Calculator
      </CategoriesDiv>
    </MainDiv>
  );
}

export default Investments;
