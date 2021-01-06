import { useEffect, useState } from "react";

const { default: MaterialTable } = require("material-table")
const data = require("./data/users.json")

const App = () => {
  const [users, setUsers] = useState(null);

  const [columns] = useState([
    { title: 'Username', field: 'username' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Website', field: 'website' },
  ]);

  useEffect(() => {
    if(!users) {
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 2000)
      }).then(users => setUsers(users))
    }
  }, [users])

  const onRowAdd = newData => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setUsers([...users, newData]);
        
        resolve();
      }, 1000)
    })
  )
            
  const onRowUpdate = (newData, oldData) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...users];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setUsers([...dataUpdate]);

        resolve();
      }, 1000)
    })
  )
            
  const onRowDelete = oldData => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataDelete = [...users];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUsers([...dataDelete]);
        
        resolve()
      }, 1000)
    })
  )
            
  return (
    <div className="root">
      <MaterialTable
        title="Users"
        isLoading={!users}
        columns={columns}
        data={users ? users : []}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete,
        }}
      />
    </div>
  );
}

export default App;
