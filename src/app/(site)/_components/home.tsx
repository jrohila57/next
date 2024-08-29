import Link from 'next/link';
import React from 'react'

const Home = () => {
  return (
    <Link
      className="text-blue-500 underline"
      href="/users">
      user page
    </Link>
  );
}
export default Home;