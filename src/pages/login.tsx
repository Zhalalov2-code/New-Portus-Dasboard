import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import '../css/login.css';
import PortusLogo from '../assets/Portus_Logo-png.png';
import { useLoginMutation } from '../store/api/authApi';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);

    // Если пользователь уже авторизован, перенаправляем на главную страницу
    useEffect(() => {
        if (currentUser) {
            navigate('/', { replace: true });
        }
    }, [currentUser, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                currentUser: response.user
            }));
            console.log('Login successful:', response);
            
            // Перенаправляем на страницу, с которой пользователь пришел, или на главную
            const from = location.state?.from?.pathname || '/';
            // Успешная авторизация
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center login-left">
                        <div className="text-center text-white">
                            <img 
                                src={PortusLogo} 
                                alt="Portus Logistics" 
                                className="mb-4" 
                                style={{ width: '400px', height: 'auto' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center login-right">
                        <div className="login-form-container">
                            <div className="text-center mb-5">
                                <h2 className="fw-bold text-dark mb-2">Willkommen zurück!</h2>
                                <p className="text-muted">Melden Sie sich bei Ihrem Konto an</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        E-Mail-Adresse
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdEmail className="text-muted" />
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="example@portus-logistics.de"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Passwort
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdLock className="text-muted" />
                                        </span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Passwort eingeben"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="text-decoration-none text-muted small">
                                        Passwort vergessen? Wenden Sie sich an den Administrator
                                    </span>
                                </div>

                                {error && (
                                    <div className="alert alert-danger mb-4">
                                        <strong>Anmeldefehler:</strong> {'data' in error ? (error.data as any)?.message || 'Ungültige E-Mail oder Passwort' : 'Verbindungsfehler'}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3 fw-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Anmeldung läuft...
                                        </>
                                    ) : (
                                        'Anmelden'
                                    )}
                                </button>

                                <div className="text-center mt-4">
                                    <p className="text-muted mb-0 small">
                                        Kein Konto? Wenden Sie sich an den Administrator
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;