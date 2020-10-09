import React, { useState, useEffect, Fragment } from "react";
import { getUsers } from "../../auth/index";
import Datatable from "./datatable";
import styled from "styled-components";

const MainDiv = styled.div`
  background-color: #3f51b5;
  padding-top: 5vh;
  padding-bottom: 25vh;
  width: 20%;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 10%;
`;

const ChildDiv = styled.div`
  margin-left: 20%;
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
`;

const changeStyle = {
  backgroundColor: "white",
  color: "#07236a",
  border: "1rem",
  boxShadow: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
};

export default () => {
  const [rows, setRows] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [zeroRecords, setZeroRecords] = useState(false);
  const [activationStatus, setActivationStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        if (!users["error"]) {
          setRows(users);
          setToggle(!toggle);
        } else {
          if (users["error"] === "No users found") setZeroRecords(true);
          setToggle(!toggle);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <MainDiv>
        <br />
        <br />
        <br />
        <br />
        <CategoriesDiv
          name="unverified Users"
          onClick={() => setActivationStatus(false)}
          style={!activationStatus ? changeStyle : {}}
        >
          USERS TO BE VERIFIED
        </CategoriesDiv>
        <br />
        <CategoriesDiv
          name="verified users"
          onClick={() => setActivationStatus(true)}
          style={activationStatus ? changeStyle : {}}
        >
          VERIFIED USERS
        </CategoriesDiv>
      </MainDiv>
      <ChildDiv>
        <div>
          {rows && rows != [] ? (
            <Datatable
              users={rows}
              toggle={toggle}
              zeroRecords={zeroRecords}
              activationStatus={activationStatus}
            />
          ) : (
            ""
          )}
        </div>
      </ChildDiv>
    </Fragment>
  );
};
