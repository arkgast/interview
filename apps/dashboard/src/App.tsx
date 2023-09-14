import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

type User = string;

const useUserApi = () => {
  const [users, setUsers] = useState<User | null>(null);
  useEffect(() => {
    api
      .get('/users')
      .then(({ data }) => setUsers(data))
      .catch((responseError) => {
        console.log(responseError);
      });
  }, []);
  return users;
};

export function App() {
  const users = useUserApi();
  console.log({ users });
  return (
    <>
      <h1>Users</h1>
      {users}
    </>
  );
}
