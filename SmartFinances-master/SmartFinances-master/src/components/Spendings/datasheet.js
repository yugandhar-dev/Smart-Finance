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
        label: "Category",
        width: 180,
        field: "Category",
      },
      {
        label: "Merchant Name",
        width: 180,
        field: "Merchant Name",
      },
      {
        label: "Outflow",
        width: 180,
        field: "Outflow",
      },
      {
        label: "Inflow",
        width: 180,
        field: "Inflow",
      },
    ],
    rows: [],
  });

  useEffect(() => {
    let arr = [{
      date: "Loading..",
      category: "",
      MerchantName: "",
      outflow: "",
      inflow: "",
      }];
    if(props.zeroRecords || props.history.length > 1){
        arr = [];
    }
    for (const row of props.history) {
      arr.push({
        date: row["date"] ? row["date"].split("GMT")[0].trim() : "",
        category: row["category"] ? row["category"] : "",
        MerchantName: row["merchantaame"] ? row["merchantname"] : "",
        outflow: row["outflow"] ? row["outflow"] : 0,
        inflow: row["inflow"] ? row["inflow"] : 0,
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