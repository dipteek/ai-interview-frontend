import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const jobTitle = formData.get('job_title');
  const jobDescription = formData.get('job_description');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    // Get the auth token from cookies
    //const token = request.cookies.get('authToken')?.value;
    //const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    //const token = cookies().get('authToken')?.value;
    const token = await getToken({ req: request });
    if (!token?.djangoToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // if (!token) {
    //   return NextResponse.json(
    //     { error: 'Authentication required' },
    //     { status: 401 }
    //   );
    // }

    const djangoResponse = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/resume/upload/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Token ${token.djangoToken}`,
      },
    });

    // Handle Django's 401 response
    if (djangoResponse.status === 401) {
      return NextResponse.json(
        { error: 'Session expired, please login again' },
        { status: 401 }
      );
    }

    const data = await djangoResponse.json();

    

    if (!djangoResponse.ok) {
      return NextResponse.json({ error: data }, { status: djangoResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to process resume ${error} ${data}` },
      { status: 500 }
    );
  }
}