export async function registerUser(username: string) {
    console.log('registration fetch request...')
    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }
    return response.json();
}

export async function loginUser(username: string) {
    console.log('login fetch request...')
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
}