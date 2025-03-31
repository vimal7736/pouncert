import {toast} from "sonner";

export const FormInput = ({label, type, register, error, name}) => (
    <div>
        <label>{label}</label>
        <input
            type={type}
            {...register(name)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"

        />
        {error && toast(error.message)}
    </div>
)