import SignInForm from '@/components/form/SignInForm';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {

    // const session = await getServerSession(authOptions);

    // if (session) {
    //     console.log("User is logged in:", session.user);
    //     // Lakukan sesuatu dengan sesi pengguna
    // } else {
    //     console.log("User is not logged in");
    // }

    return (
        <div className='w-full'>
            <SignInForm />
        </div>
    );
};

export default page;