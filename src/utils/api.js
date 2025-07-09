export async function generateQuestions(data) {
    const response = await fetch('http://localhost:8000/api/generate-questions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }
  
    return await response.json();
  }

