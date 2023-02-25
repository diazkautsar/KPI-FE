import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { setToken } from '../utils/token';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastTitle, setToastTitle] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowToast(false);
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowToast(false);
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email === '' || password === '') {
            setToastMessage('Email/Username dan password harus diisi');
            setShowToast(true);
        } else {
            const loginResponse = await login(email, password);

            if (!loginResponse.success) {
                setShowToast(true);
                setToastTitle(loginResponse.messageTitle);
                setToastMessage(loginResponse.message);

                return;
            }

            await setToken(loginResponse.data.access_token);
            navigate('/dashboard');

            return;
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email/Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                >
                    <Toast.Header>
                        <strong className="me-auto">{toastTitle}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
};

export default LoginPage;
