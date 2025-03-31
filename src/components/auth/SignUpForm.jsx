import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import pinata from '../../utils/pinataConfig';
import {signUpSchema} from "@/lib/auth/schema.js";
import {generateAndSendHash} from "@/lib/auth/api.js";
import {FormInput} from "@/components/ui/FormInput.jsx";
import {SubmitButton} from "@/components/ui/SubmitButton.jsx";

const SignUpForm = ({ onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset
    } = useForm({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = async (formData) => {
        try {
            // Verify Pinata connection first
            const isConnected = await pinata.testConnection();
            if (!isConnected) {
                throw new Error('Storage service unavailable. Please try again later.');
            }

            // Generate hash
            const hash = generateAndSendHash(formData.email, formData.phone);

            // Prepare data for IPFS
            const ipfsData = {
                email: formData.email,
                phone: formData.phone,
                hash,
                createdAt: new Date().toISOString(),
                // Add additional metadata if needed
                version: '1.0.0'
            };

            // Upload to Pinata
            const { gatewayUrl } = await pinata.upload(ipfsData);

            // Store hash locally
            localStorage.setItem('authHash', hash);

            // Reset form and show success
            reset();
            onSuccess(hash, gatewayUrl);

        } catch (error) {
            console.error('Signup error:', error);
            setError('root', {
                type: 'manual',
                message: error.message || 'Failed to create account. Please try again.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {errors.root && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {errors.root.message}
                </div>
            )}

            <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                register={register}
                error={errors.email}
            />

            <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                register={register}
                error={errors.phone}
            />

            <div className="pt-2">
                <SubmitButton isLoading={isSubmitting}>
                    {isSubmitting ? 'Securing your account...' : 'Create Account'}
                </SubmitButton>
            </div>
        </form>
    );
};

export default SignUpForm;