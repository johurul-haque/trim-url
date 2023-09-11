// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log(data);

  // if (!data)
  //   return NextResponse.json({
  //     error: 'Unprocessable Entity',
  //     message: 'Request body is empty. Please provide the necessary data.',
  //   });

  // console.log(JSON.parse(data));

  // try {
  //   const result = await db.uRL.findMany();
  //   return NextResponse.json(result);
  // } catch (error) {
  //   NextResponse.json(error);
  // }
};
