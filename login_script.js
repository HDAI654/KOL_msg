const API_URL = 'https://67d54ef7d2c7857431effb81.mockapi.io/api/kol-msg-messages/users'; // 👈 API for login

async function handleLogin(event) {
    event.preventDefault(); // Prevent page refresh

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Send login request to API
        const response = await fetch(`${API_URL}?username=${username}&password=${password}`);
        const users = await response.json();

        // Check username and password validity
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // ✅ Set cookies
            document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 365}`;
            document.cookie = `login=$vG8!z@Qm#L4W^bP2*rT1o%K7y&X3dJ9CqZ5M(N)6F+U; path=/; max-age=${60 * 60 * 24 * 365}`;

            // ✅ Redirect to chat page
            window.location.href = '/KOL_msg';
        } else {
            // ❌ Invalid credentials → Show error message
            document.getElementById('error-message').textContent = 'Invalid username or password!';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        document.getElementById('error-message').textContent = 'Server error! Please try again later.';
    }
}

// Get cookies
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.split('=')[1];
        }
    }
    return null;
}

window.onload = async () => {
    const username = getCookie('username');
    const loginToken = getCookie('login');

    // ✅ Check cookie validity
    if (username && loginToken === "$vG8!z@Qm#L4W^bP2*rT1o%K7y&X3dJ9CqZ5M(N)6F+U") {
        window.location.href = '/KOL_msg';
    }
};
