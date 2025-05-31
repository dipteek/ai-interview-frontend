import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { resumeId } = params;

    const djangoResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/resume/${resumeId}/questions/`,
      {
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
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
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}