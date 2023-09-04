import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    if (!request.headers.get('Content-Type')?.includes('application/json')) {
      return NextResponse.json({ data: 'Missing Content-Type header' }, { status: 400 });
    }
    if (request.method !== 'POST') {
      return NextResponse.json({ data: 'Method not allowed' }, { status: 405 });
    }
    if (!request.body) {
      return NextResponse.json({ data: 'Missing request body' }, { status: 400 });
    }
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ data: 'Missing required fields' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ data: 'Passwords do not match' }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          data: 'User already exists',
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: 'Internal server error' }, { status: 500 });
  }
}
