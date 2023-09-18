import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const useUserApi = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await api.get<User[]>('/users');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return users;
};

const createUserApi = async (user: Omit<User, 'id'>) => {
  try {
    console.log(user);
    const { data } = await api.post('/users', user);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export function App() {
  const users = useUserApi();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const user: Omit<User, 'id'> = {
      firstName,
      lastName,
      email,
    };

    createUserApi(user);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />

          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button type="submit">Save</button>
        </form>
      </div>

      <h1>List of users</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          );
        })}
      </ul>
    </>
  );
}
