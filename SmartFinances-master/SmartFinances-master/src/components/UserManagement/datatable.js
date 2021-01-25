import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Button, Input, TextField } from '@material-ui/core';
import { acceptUser } from '../../auth/index';

export default props => {
  let userData = {};
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'accountNumber',
        width: 80,
        field: 'accountNumber',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'accountNumber',
        },
      },
      {
        label: 'firstName',
        width: 120,
        field: 'firstName',
      },
      {
        label: 'lastName',
        width: 120,
        field: 'lastName',
      },
      {
        label: 'email',
        width: 180,
        field: 'email',
      },
      {
        label: 'bankName',
        width: 180,
        field: 'bankName',
      },
      {
        label: 'address',
        width: 100,
        field: 'address',
      },
      {
        label: 'tfnNumber',
        width: 180,
        field: 'tfnNumber',
      },
      {
        label: 'phone',
        width: 180,
        field: 'phone',
      },
      {
        label: 'isEnrolled',
        width: 180,
        field: 'isEnrolled',
      },
      {
        label: 'university',
        width: 180,
        field: 'university',
      },
      {
        label: '',
        width: 180,
        field: 'Accept',
      },
      {
        label: '',
        width: 180,
        field: 'Decline',
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

  const saveUser = async event => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.id);
    const id = event.currentTarget.dataset.id;
    const res = await acceptUser(id);
    console.log(res);
  };

  const deleteUser = event => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.id);
  };

  useEffect(() => {
    let arr = [
      {
        accountNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        bankName: '',
        address: '',
        tfnNumber: '',
        phoneNumber: '',
        isEnrolled: '',
        university: '',
        isWorking: '',
        officeLocation: '',
        openingBalance: '',
        Accept: '',
        Decline: '',
      },
    ];
    console.log(props.users);
    // if (props.zeroRecords || props.users.length > 1) {
    //   arr = [];
    // }
    for (const row of props.users) {
      arr.push({
        accountNumber: (
          <TextField
            size="small"
            variant="outlined"
            name="accountNumber"
            type="text"
            defaultValue={row['accountNumber'] ? row['accountNumber'] : 0}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        firstName: (
          <TextField
            size="small"
            variant="outlined"
            name="firstName"
            type="text"
            defaultValue={row['firstName'] ? row['firstName'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        lastName: (
          <TextField
            size="small"
            variant="outlined"
            name="lastName"
            type="text"
            defaultValue={row['lastName'] ? row['lastName'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        email: (
          <TextField
            size="small"
            variant="outlined"
            name="email"
            type="text"
            defaultValue={row['email'] ? row['email'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        bankName: (
          <TextField
            size="small"
            variant="outlined"
            name="bankName"
            type="text"
            defaultValue={row['bankName'] ? row['bankName'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        address: (
          <TextField
            size="small"
            variant="outlined"
            name="address"
            type="text"
            defaultValue={row['address'] ? row['address'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        tfnNumber: (
          <TextField
            size="small"
            variant="outlined"
            name="tfnNumber"
            type="text"
            defaultValue={row['tfnNumber'] ? row['tfnNumber'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        phone: (
          <TextField
            size="small"
            variant="outlined"
            name="phone"
            type="text"
            defaultValue={row['phone'] ? row['phone'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        isEnrolled: (
          <TextField
            size="small"
            variant="outlined"
            name="isEnrolled"
            type="text"
            defaultValue={row['isEnrolled'] ? row['isEnrolled'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        university: (
          <TextField
            size="small"
            variant="outlined"
            name="university"
            type="text"
            defaultValue={row['university'] ? row['university'] : ''}
            onChange={event => handleChange(event, row['_id'])}
          />
        ),
        Accept: (
          <Button
            className="primary"
            color="primary"
            variant="contained"
            data-id={row['_id']}
            onClick={saveUser}
          >
            Accept
          </Button>
        ),

        Decline: (
          <Button
            className="secondary"
            color="secondary"
            variant="contained"
            data-id={row['_id']}
            onClick={e =>
              window.confirm('Are you sure you wish to delete this item?')
            }
          >
            Decline
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
