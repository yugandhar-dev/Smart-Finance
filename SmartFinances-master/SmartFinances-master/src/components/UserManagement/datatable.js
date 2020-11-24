import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Button, Input, TextField } from "@material-ui/core";

export default props => {
  let userData = {};
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "accountNumber",
        width: 120,
        field: "accountNumber",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "accountNumber",
        },
      },
      {
        label: "walletAccountNumber",
        width: 120,
        field: "walletAccountNumber",
      },
      {
        label: "emailId",
        width: 180,
        field: "emailId",
      },
      {
        label: "bankName",
        width: 180,
        field: "bankName",
      },
      {
        label: "address",
        width: 100,
        field: "address",
      },
      {
        label: "tfnNumber",
        width: 180,
        field: "tfnNumber",
      },
      {
        label: "",
        width: 180,
        field: "Save",
      },
      {
        label: "",
        width: 180,
        field: "Delete",
      },
    ],
    rows: [],
  });

  const handleChange = (event, userId) => {
    event.preventDefault();
    userData[userId] = {
      ...userData[userId],
      [event.currentTarget.name]: event.currentTarget.value,
    };
  };

  const saveUser = event => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.id);
    const id = event.currentTarget.dataset.id;
    console.log(userData[id]);
  };

  const deleteUser = event => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.id);
  };

  useEffect(() => {
    let arr = [
      {
        accountNumber: "Loading..",
        walletAccountNumber: "",
        emailId: "",
        bankName: "",
        address: "",
        tfnNumber: "",
        Save: "",
        Delete: "",
      },
    ];
    console.log(props.users);
    if (props.zeroRecords || props.users.length > 1) {
      arr = [];
    }
    for (const row of props.users) {
      arr.push({
        accountNumber: (
          <TextField
            size="small"
            variant="outlined"
            name="accountNumber"
            type="text"
            defaultValue={row["accountNumber"] ? row["accountNumber"] : 0}
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        walletAccountNumber: (
          <TextField
            size="small"
            variant="outlined"
            name="walletAccountNumber"
            type="text"
            defaultValue={
              row["walletAccountNumber"] ? row["walletAccountNumber"] : 0
            }
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        emailId: (
          <TextField
            size="small"
            variant="outlined"
            name="emailId"
            type="text"
            defaultValue={row["emailId"] ? row["emailId"] : 0}
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        bankName: (
          <TextField
            size="small"
            variant="outlined"
            name="bankName"
            type="text"
            defaultValue={row["bankName"] ? row["bankName"] : ""}
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        address: (
          <TextField
            size="small"
            variant="outlined"
            name="address"
            type="text"
            defaultValue={row["address"] ? row["address"] : ""}
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        tfnNumber: (
          <TextField
            size="small"
            variant="outlined"
            name="tfnNumber"
            type="text"
            defaultValue={row["tfnNumber"] ? row["tfnNumber"] : ""}
            onChange={(event) => handleChange(event, row["_id"])}
          />
        ),
        Save: (
          <Button
            className="primary"
            variant="outlined"
            data-id={row["_id"]}
            onClick={saveUser}
          >
            Save
          </Button>
        ),
        Delete: (
          <Button
            className="secondary"
            variant="outlined"
            data-id={row["_id"]}
            onClick={deleteUser}
          >
            Delete
          </Button>
        ),
      });
    }

    setDatatable({
      columns: datatable.columns,
      rows: arr == [] ? datatable.rows : arr,
    });
  }, [props.toggle]);

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      pagingTop
      searchTop
      searchBottom={false}
      barReverse
      noRecordsFoundLabel="No users found"
    />
  );
};
