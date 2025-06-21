import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request, { params }) {
  try {
    const { resumeId } = params;

    // Get the session token (jwt stored by next-auth)
    const token = await getToken({ req: request });

    if (!token?.djangoToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const djangoResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/resume/${resumeId}/questions/`,
      {
        headers: {
          Authorization: `Token ${token.djangoToken}`,
        },
      }
    );

    const data = await djangoResponse.json();

    if (!djangoResponse.ok) {
      return NextResponse.json({ error: data }, { status: djangoResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch questions: ${error.message}` },
      { status: 500 }
    );
  }
}
