import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact } from '@/controllers/contacts';
import { Loader } from '@/components/Loader';
import Link from 'next/link';

export default function SingleContact({ contact }: { contact: Contact }) {
  const queryClient = useQueryClient();
  const { fullName, phoneNumber, email, address, _id } = contact;

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  return (
    <tr className="bg-white/50 h-[3rem] border-b text-center border-black/40">
      <td>{fullName}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td className="flex items-center gap-2 text-xl mt-[1rem]">
        <span>
          <Link href={`/addContact?id=${_id}`}>
            <AiFillEdit className="text-blue-500 cursor-pointer hover:opacity-70" />
          </Link>
        </span>
        <span onClick={() => mutate(_id ?? '')}>
          {isLoading ? Loader : <BsFillTrashFill className="text-red-500 cursor-pointer hover:opacity-70" />}
        </span>
      </td>
    </tr>
  );
}
