import { useState } from 'react';
import AuthLayout from "@/components/auth/AuthLayout.jsx";
import {LoginForm} from "@/components/auth/LoginForm.jsx";
import SignUpForm from "@/components/auth/SignUpForm.jsx";

const AuthPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(false);
    const [recentHash, setRecentHash] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
            <AuthLayout title={isLoginView ? "Login with Hash" : "Create Account"}>
                {isLoginView ? (
                    <LoginForm
                        onLoginSuccess={onLoginSuccess}
                        recentHash={recentHash}
                    />
                ) : (
                    <SignUpForm
                        onSuccess={(hash) => {
                            setRecentHash(hash);
                            setIsLoginView(true);
                        }}
                    />
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLoginView(!isLoginView)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        {isLoginView ? (
                            <>Don't have an account? <span className="font-semibold"> Sign Up</span></>
                        ) : (
                            <>Already have a hash? <span className="font-semibold">Login</span></>
                        )}
                    </button>
                </div>
            </AuthLayout>
        </div>
    );
};

export default AuthPage;