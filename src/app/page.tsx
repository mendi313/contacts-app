'use client';
import SingleContact from '@/components/SingleContact';
import Link from 'next/link';
import { getAllContact } from '@/controllers/contacts';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/Loader';

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContact,
  });
  const contacts: Contact[] = data;

  return (
    <div className="mx-auto w-[90%] lg:w-[70%] my-[5rem] text-center p-4 ">
      <div className="text-right">
        <Link href="/addContact">
          <span className="bg-blue-800 p-3 py-3 rounded-md text-white hover:bg-blue-900">Add Contact</span>
        </Link>
      </div>
      <div className="mt-[2rem]">
        <h1 className="text-3xl py-4 uppercase text-white text-center">Contact App</h1>
        {isLoading ? (
          Loader
        ) : isError ? (
          // Handle error if there's an issue with the API call
          <div className="text-center">Error loading data.</div>
        ) : (
          // Display the table once data is loaded
          <table className="w-full rounded-md overflow-hidden">
            <tbody>
              <tr className="bg-white/70 h-[4rem] text-black/80">
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {contacts?.map((contact, index) => (
                <SingleContact key={index} contact={contact} />
              ))}
            </tbody>
          </table>
        )}
        {contacts?.length === 0 && ( <div className="w-full p-2 overflow-hidden text-center bg-white/40" >No contacts found.</div> )}
      </div>
    </div>
  );
}
