import { connectDB } from '@/connect/connect';
import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, isValidPhoneNumber } from '@/lib/utils';
import Contact from '@/contactSchema/contact';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const contact = await Contact.findById(id);
      if (contact) {
        return NextResponse.json(contact);
      }
    }
    const res = await Contact.find();
    return NextResponse.json(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, address, email, phoneNumber }: Contact = await request.json();

    // Validate input data
    if (!fullName) {
      return NextResponse.json('Full Name is required');
    }

    if (!address) {
      return NextResponse.json('Address is required');
    }

    if (!isValidEmail(email)) {
      return NextResponse.json('Invalid Email');
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return NextResponse.json('Invalid Phone Number');
    }

    const newContact = { fullName, address, email, phoneNumber };

    const response = await Contact.create(newContact);
    return NextResponse.json(response);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  try {
    const res = await Contact.findByIdAndDelete(id);
    return NextResponse.json(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const { fullName, address, email, phoneNumber } = await request.json();
  try {   
    const res = await Contact.findByIdAndUpdate(id, { fullName, address, email, phoneNumber });
    return NextResponse.json(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
