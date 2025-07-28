I have built a full-stack real-time chat application that enables users to engage in one-on-one conversations, share text messages and photos, and view user profiles seamlessly. The app begins with a secure JWT-based authentication system, allowing users to sign up, log in, and stay logged in across sessions. Each authenticated user can view a list of other registered users, select any of them, and start a real-time conversation.

To ensure instant message delivery, the app uses Socket.IO for real-time bi-directional communication between client and server. Users can also upload and share images, which are shown with a live image preview feature, enhancing the chat experience. A profile section allows users to view and update personal details, including profile pictures and bios.

The backend is built using Node.js and Express.js, with routes for authentication, user management, chat handling, and media uploads. For persistent storage, the app uses a cloud-based MongoDB Atlas database for storing user credentials, chat history, and media metadata securely. Media files (like profile pics and shared images) are stored using Cloudinary, ensuring fast and scalable delivery.

The entire application is deployed using Render, enabling users to access it reliably with automatic server restarts and scalability. The frontend is developed with React.js, making the UI responsive, interactive, and easy to navigate.

Live-Preview-https://drive.google.com/file/d/1ahXDNgzUetxqHqd3Y6hTIYrCyBOEIIOW/view?usp=sharing
Live-Link-https://chat-app-ccqc.onrender.com
