import React, { useState, useEffect } from 'react';
import { getSpending, getUserDetails } from '../../auth/index';
import Datatable from './datasheet';
import Button from '@material-ui/core/Button';
import './printStyle.css';

export default () => {
  const [rows, setRows] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [zeroRecords, setZeroRecords] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      try {
        const history = await getSpending({
          //walletAccountNumber: userDetails[0].walletAccountNumber,
        });
        if (!history['error']) {
          setRows(history);
          setToggle(!toggle);
        } else {
          if (history['error'] == 'No User Transactions Found')
            setZeroRecords(true);
          setToggle(!toggle);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="print-btn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.print()}
          style={{ float: 'right', marginTop: 10 }}
        >
          Print Statement
        </Button>
      </div>
      {rows && rows != [] ? (
        <Datatable history={rows} toggle={toggle} zeroRecords={zeroRecords} />
      ) : (
        ''
      )}
    </div>
  );
};
