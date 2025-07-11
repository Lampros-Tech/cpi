'use client'
import img from "@/public/assets/images/pix_arrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewsLetterSignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit the form');
            }

            const data = await res.json();
            setSuccess('Subscribed successfully!');
        } catch (err: any) {
            console.error('Failed to submit the form:', err);
            setError(err.message || 'Failed to submit the form');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setError(null);
        setSuccess(null);
    }, [email])
    return (<>
        <form
            className="flex items-center justify-between bg-black border border-white rounded-full p-2 mt-6"
            onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 ml-2 max-w-[80%] bg-transparent text-[25px] font-mori font-semibold text-white placeholder-[#333333] focus:outline-none flex-grow"
            />
            <button
                type="submit"
                className="hover:scale-[1.1] bg-[#262626] text-white p-2 rounded-full ml-2"
                disabled={loading}>

                {loading ? <svg
                    width="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin"
                >
                    <path
                        opacity="0.5"
                        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17316C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761204C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87103 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99112 2.15372 8.43928C2.4624 6.88743 3.22433 5.46196 4.34315 4.34314C5.46197 3.22432 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21446 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6568C14.1566 17.1571 12.1217 18 10 18V18Z"
                        fill="#7E9195"
                    ></path>
                    <path
                        d="M18 10H20C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10Z"
                        fill="currentColor"
                    ></path>
                </svg> : <Image src={img} alt="arrow icon" width={24} loading="lazy" />}
            </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
    </>
    )
}

export default NewsLetterSignUp;