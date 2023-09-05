'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { addContact, getContact, updateContact } from '@/controllers/contacts';
import { isValidEmail, isValidPhoneNumber } from '@/lib/utils';
import Input from '@/components/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const inputs: Input[] = [
  {
    label: 'Full Name',
    name: 'fullName',
    type: 'text',
    placeholder: 'Full Name',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'tel',
    placeholder: 'Phone Number',
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
    placeholder: 'Address',
  },
];

export default function ContactForm() {
  const [fetchedId, setFetchedId] = useState<string | null>(null);
  const [editState, setEditState] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  useEffect(() => {
    // Check if id has changed and fetch contact data if needed
    if (id && id !== fetchedId) {
      setEditState(true);
      getContact(id).then((res) => {
        setFormData({
          fullName: res.fullName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          address: res.address,
        });
        setFetchedId(id); // Mark the id as fetched to prevent further calls
      });
    }
  }, [id, fetchedId, searchParams]);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
  const [formData, setFormData] = useState<Contact>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState<Contact>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors: Contact = {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
    };

    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number is required';
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.address.trim()) {
      validationErrors.address = 'Address is required';
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== '')) {
      return;
    }
    if (id) {
      updateContact(id, formData);
    } else mutate(formData);
    router.push('/');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear error when input changes
    });
  };

  return (
    <div className="w-[90%] md:w-[30rem] mx-auto my-[5rem] border border-gray-500 bg-white/50 rounded-md p-6">
      <span
        onClick={() => router.push('/')}
        className="bg-blue-600/50 p-3 rounded-md hover:bg-slate-700/50 absolute left-[3rem] top-[3rem] cursor-pointer"
      >
        Go Back
      </span>
      <h2 className="pb-7 text-center text-2xl">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <Input
            input={{
              label: input.label,
              name: input.name,
              type: input.type,
              placeholder: input.placeholder,
            }}
            key={index}
            value={formData[input.name as keyof Contact]}
            error={errors[input.name as keyof Contact]}
            handleFunc={handleInputChange}
          />
        ))}
        <button className="bg-blue-600 p-3 py-2 w-full w- rounded-md" type="submit">
          {/* {editState ? 'Update' : isLoading ? 'Submitting...' : 'Submit'} */}
          {editState ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
