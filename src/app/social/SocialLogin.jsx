"sue client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const SocialLogin = () => {
    const session = useSession();
    const router = useRouter();
    const handleSocialLogin = (providerName)=>{
        // console.log(providerName)
        signIn(providerName)  
    }
    useEffect(()=>{
        if(session?.status == "authenticated"){
            router.push("/")
            toast.success("Login Successfully!")
        }
    },[session?.status])
    return (
        <div>
            <button onClick={()=>handleSocialLogin("google")} className='btn w-full'>Continue with google</button>
        </div>
    );
};

export default SocialLogin;