'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@web/actions/users/users.actions';

export default function Home() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUsers();
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
