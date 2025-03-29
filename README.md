# KOL_msg
![HTML](https://img.shields.io/badge/HTML-5-red)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.x-purple)
![License](https://img.shields.io/badge/License-MIT-green)

KOL_msg is a simple real-time chat application built with HTML, CSS, and JavaScript. It features user authentication, secure session handling with cookies, and message storage using a mock API.

---

## 🚀 Features
- **User Authentication:** Secure login with credentials stored in `db.json`.
- **Real-Time Messaging:** Messages are sent and received in real-time using `mockapi.io`.
- **Session Handling:** Uses cookies for automatic login and session management.
- **Responsive UI:** Built with Bootstrap for a clean and modern design.
- **Message Persistence:** Messages are stored and retrieved from the mock API.

---

## 🛠️ Technologies Used
- **HTML5** – Structure and markup  
- **CSS3** – Styling and responsiveness  
- **JavaScript (Vanilla)** – Client-side logic  
- **Bootstrap** – Responsive design  
- **MockAPI** – Backend for message storage  

---

## 📂 Project Structure
```plaintext
KOL_msg/
├── bootstrap.min.css   # Bootstrap for styling
├── index.html          # Main chat interface
├── login.html          # Login page
├── login_style.css           # Styling for login page
├── login_script.js            # Handles login and session cookies
├── page_script.js           # Handles chat functionality
├── page_style.css           # Styling for chat interface
├── LICENSE             # License of project
└── README.md           # Project documentation
```

---

## 🚦 Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/KOL_msg.git
```
2. Navigate to the project directory:
```bash
cd KOL_msg
```
3. Open `index.html` or `login.html` in your browser.

---

## 💻 Usage
1. go to address   https://hdai654.github.io/KOL_msg   and login 
- username : TestUser
- password : testuser123
2. and enjoy to use this app

OR

1. Open `login.html` in your browser.  
2. Enter valid credentials (from `db.json`) to log in.  
3. Start sending and receiving messages.  

---

## 🔐 Authentication Details
- **Sample Credentials:**
  - Username: `Ali`, Password: `1234`
  - Username: `Reza`, Password: `5678`
- Session cookies are set upon successful login:
  - `username`
  - `login` (secure token)


---

## 🌟 Contributing
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/your-feature`).  
3. Commit your changes (`git commit -m 'Add new feature'`).  
4. Push to the branch (`git push origin feature/your-feature`).  
5. Open a Pull Request.  

---

## 📄 License
This project is licensed under the [**MIT License**](LICENSE). Feel free to modify and use it for personal and commercial purposes.
