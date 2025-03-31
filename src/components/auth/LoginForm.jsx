import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/lib/auth/schema.js";
import {toast} from "sonner";
import {FormInput} from "@/components/ui/FormInput.jsx";
import {SubmitButton} from "@/components/ui/SubmitButton.jsx";


export const LoginForm = ({onLoginSuccess}) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(loginSchema)
    });

    const verifyHash = async (hash) => {
        try {
            const storedHash = localStorage.getItem("authHash");
            return hash === storedHash;
        } catch (error) {
            console.error(error);
            return false
        }
    };

    const onSubmit = async (data) => {
        const isValid = await verifyHash(data.user);
        if (isValid) {
            onLoginSuccess()
        } else {
            toast("hash is invalid my dude............")
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput
                label="Authentication Hash"
                type="text"
                name="hash"
                register={register}
                error={errors.hash}
            />

            <SubmitButton isLoading={isSubmitting}>Login in</SubmitButton>


        </form>
    )
}