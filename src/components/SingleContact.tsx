import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact } from '@/controllers/contacts';
import { Loader } from '@/components/Loader';
import { ContextValue } from '@/Context/Context';
import { useRouter } from 'next/navigation';

export default function SingleContact({ contact }: { contact: Contact }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUpdate } = ContextValue();
  const { fullName, phoneNumber, email, address, _id } = contact;

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  function handleEditClick() {
    setUpdate({ fullName, phoneNumber, email, address, _id });
    router.push('/addContact')
  }
  return (
    <tr className="bg-white/50 h-[3rem] border-b text-center border-black/40">
      <td>{fullName}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td className="flex items-center gap-2 text-xl mt-[1rem]">
        <span onClick={handleEditClick}>
          <AiFillEdit className="text-blue-500 cursor-pointer hover:opacity-70" />
        </span>
        <span onClick={() => mutate(_id ?? '')}>
          {isLoading ? Loader : <BsFillTrashFill className="text-red-500 cursor-pointer hover:opacity-70" />}
        </span>
      </td>
    </tr>
  );
}
