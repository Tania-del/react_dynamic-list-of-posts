import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setIsLoading(true);
    const response = await client.get<User[]>('/users');

    setIsLoading(false);

    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, isLoading };
};
