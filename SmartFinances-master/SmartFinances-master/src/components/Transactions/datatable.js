import React, { useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default (props) => {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Date",
        width: 120,
        field: "Date",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Date",
        },
      },
      {
        label: "Amount",
        width: 180,
        field: "Amount",
      },
      {
        label: "Rounded amount",
        width: 180,
        field: "RoundedAmount",
      },
      {
        label: "Category",
        width: 180,
        field: "Category",
      },
      {
        label: "Sub-Category",
        width: 180,
        field: "Sub_Category",
      },
    ],
    rows: [],
  });

  useEffect(() => {
    let arr = [{
      Date: "Loading..",
      Amount: "",
      RoundedAmount: "",
      Category: "",
      Sub_Category: "",
      }];
    if(props.zeroRecords || props.history.length > 1){
        arr = [];
    }
    for (const row of props.history) {
      arr.push({
        Date: row["date"] ? row["date"].split("GMT")[0].trim() : "",
        Amount: row["amount"] ? row["amount"] : 0,
        RoundedAmount: row["roundedAmount"] ? row["roundedAmount"] : 0,
        Category: row["category"] ? row["category"] : "",
        Sub_Category: row["subcategory"] ? row["subcategory"] : "",
      });
    }

    

    setDatatable({ columns: datatable.columns, rows: arr == [] ? datatable.rows : arr });
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
      noRecordsFoundLabel='No Transactions found'
    />
  );
};
