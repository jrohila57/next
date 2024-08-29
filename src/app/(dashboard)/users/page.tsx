import { getUsersColumnList, getUsersList } from "./_actions/user-actions";
import UsersComponent from "./_components/user-table";
import { payloadCreator } from "./_components/user-table-config";

const UserPage = async () => { 

  const payload = payloadCreator({
    pageParam: 0,
    fetchSize: 25,
    columnFilters: [],
    globalFilter: "",
    sorting: [],
  })
  const [data, columns] = await Promise.all([
    getUsersList(payload),
    getUsersColumnList('user')
  ])
  return <UsersComponent firstLoadData={data} initialColumnData={columns} />
};

export default UserPage;
