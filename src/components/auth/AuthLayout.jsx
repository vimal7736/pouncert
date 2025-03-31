const AuthLayout = ({ children, title }) => {
    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            <div className="p-6">
                {children}
            </div>
            <div className="bg-gray-50 px-6 py-4 text-center">
                <p className="text-xs text-gray-500">
                    Secured with IPFS & Pinata Gateway
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;