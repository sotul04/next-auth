import SignInForm from '@/components/form/SignInForm';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {

    return (
        <div className='w-full'>
            <SignInForm />
        </div>
    );
};

export default page;