export const SubmitButton = ({children, isLoading = false}) => (
    <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
        >
        {isLoading ? 'Loading...' : children}
    </button>
)