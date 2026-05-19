import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../main.css';

export default function Login({ onLoginSuccess, isLoggedIn, onNavigate }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const trimmedUser = username.trim();
        if (!trimmedUser) {
            alert('Please enter your GitHub username');
            return;
        }
        setIsConnecting(true);
        try {
            const response = await fetch(`https://api.github.com/users/${trimmedUser}`);
            if (response.ok) {
                const data = await response.json();
                onLoginSuccess({
                    username: data.login,
                    name: data.name || data.login,
                    avatar: data.avatar_url,
                    bio: data.bio || 'GitHub Developer',
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following
                });
            } else {
                // If API rate limited or user not found, fallback to dynamic mock for this specific username
                onLoginSuccess({
                    username: trimmedUser,
                    name: trimmedUser,
                    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
                    bio: 'GitHub Developer | Open Source Enthusiast',
                    repos: 18,
                    followers: 25,
                    following: 30
                });
            }
        } catch (error) {
            // Safe network fallback for any user
            onLoginSuccess({
                username: trimmedUser,
                name: trimmedUser,
                avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
                bio: 'GitHub Developer | Open Source Enthusiast',
                repos: 18,
                followers: 25,
                following: 30
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const mockGithubLogin = async () => {
        const targetUser = username.trim() || 'Lawrencejay22';
        setIsConnecting(true);
        try {
            const response = await fetch(`https://api.github.com/users/${targetUser}`);
            if (response.ok) {
                const data = await response.json();
                onLoginSuccess({
                    username: data.login,
                    name: data.name || data.login,
                    avatar: data.avatar_url,
                    bio: data.bio || 'GitHub Developer',
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following
                });
            } else {
                // Dynamic fallback if API fails
                onLoginSuccess({
                    username: targetUser,
                    name: targetUser === 'Lawrencejay22' ? 'Lawrence Jay' : targetUser,
                    avatar: targetUser === 'Lawrencejay22' ? 'https://avatars.githubusercontent.com/u/100414902?v=4' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                    bio: targetUser === 'Lawrencejay22' ? 'Full Stack Developer | React Enthusiast' : 'GitHub Developer',
                    repos: targetUser === 'Lawrencejay22' ? 24 : 15,
                    followers: targetUser === 'Lawrencejay22' ? 120 : 35,
                    following: targetUser === 'Lawrencejay22' ? 45 : 20
                });
            }
        } catch (error) {
            onLoginSuccess({
                username: targetUser,
                name: targetUser === 'Lawrencejay22' ? 'Lawrence Jay' : targetUser,
                avatar: targetUser === 'Lawrencejay22' ? 'https://avatars.githubusercontent.com/u/100414902?v=4' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                bio: targetUser === 'Lawrencejay22' ? 'Full Stack Developer | React Enthusiast' : 'GitHub Developer',
                repos: targetUser === 'Lawrencejay22' ? 24 : 15,
                followers: targetUser === 'Lawrencejay22' ? 120 : 35,
                following: targetUser === 'Lawrencejay22' ? 45 : 20
            });
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <section className="login-container" id="loginForm">
            <div className="login-card">
                <h1>Login to GitHub Account</h1>
                <p>Enter your details to access the application</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="usernameInput">GitHub Username</label>
                        <input
                            type="text"
                            id="usernameInput"
                            placeholder="Enter GitHub username (octocat)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input
                            type="password"
                            id="passwordInput"
                            placeholder="Enter password (password)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <div className="divider">
                    <span>or connect with</span>
                </div>

                <div className="social-login">
                    <button
                        onClick={mockGithubLogin}
                        className={`github-social-btn ${isConnecting ? 'connecting' : ''}`}
                        disabled={isConnecting}
                    >
                        {isConnecting ? (
                            <><div className="spinner-small"></div> Connecting...</>
                        ) : (
                            <><FontAwesomeIcon icon={["fab", "github"]} style={{ marginRight: '8px' }} /> GitHub</>
                        )}
                    </button>
                </div>

                {isLoggedIn && (
                    <button onClick={() => onNavigate('home')} className="back-link">
                        Back to Search
                    </button>
                )}
            </div>
        </section>
    );
}
