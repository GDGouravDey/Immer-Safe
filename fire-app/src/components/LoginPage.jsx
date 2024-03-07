import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { google_auth } from '../assets/index';

const LoginPage = () => {
    const containerRef = useRef(null);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggle = () => {
        containerRef.current.classList.toggle('active');
        setTimeout(() => {
            setIsSignUp(!isSignUp);
        }, 260);
    };

    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </Helmet>
            <div className={`bg-primary min-h-screen items-center justify-center container hidden md:block`} style={{ fontFamily: 'Montserrat' }} ref={containerRef}>
                <div className={`mx-auto max-w-sm overflow-hidden rounded-md form-container ${isSignUp ? 'sign-up' : 'sign-in'}`} >
                    <form className={`p-6 form`}>
                        <h1 className={`text-3xl mb-6 heading`} style={{ fontWeight: 700 }}>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
                        <div className={`mb-2 socialIcons`}>
                            <img src={google_auth} alt="Google" className="relative h-[94%] z-[5]" />
                        </div>
                        <span className={`span mb-1`}>{isSignUp ? 'or use your email for registration' : 'or use your email password'}</span>
                        {isSignUp && <input type="text" placeholder="Name" id="name" className={`input`} />}
                        <input type="email" placeholder="Email" id="email" className={`input`} />
                        <input type="password" placeholder="Password" id="password" className={`input`} />
                        {isSignUp && <input type="number" placeholder="Phone Number" id="number" className={`input`} />}
                        {isSignUp && <button className={`button`} id="signup">Sign Up</button>}
                        {!isSignUp && (
                            <>
                                <a href="#" className={`text-xs text-gray-600 block mb-2 forgotPassword`}>Forget Your Password?</a>
                                <button className={`btn-primary signInButton`} id="signin">Sign In</button>
                            </>
                        )}
                    </form>
                </div>
                <div className={`toggle-container w-1/2 h-full overflow-hidden bg-gradient-to-l from-primary to-transparent toggleContainer`}>
                    <div className={`toggle h-full bg-gradient-to-r from-primary to-transparent text-white toggle`}>
                        <div className={`toggle-panel toggle-right p-6 text-center togglePanel`}>
                            <h1 className={`text-3xl font-semibold mb-4 toggleHeading`} style={{ fontWeight: 700 }}>Hello, Friend!</h1>
                            <p className={`text-sm mb-4 toggleText`}>Register with your personal details to use all site features</p>
                            <button className={`button2`} id="signuptemp" onClick={handleToggle}>Sign Up</button>
                        </div>
                        <div className={`toggle-panel toggle-left p-6 text-center togglePanel`}>
                            <h1 className={`text-3xl font-semibold mb-4 toggleHeading`} style={{ fontWeight: 700 }}>Welcome Back!</h1>
                            <p className={`text-sm mb-4 toggleText`}>Enter your personal details to use all site features</p>
                            <button className={`button2`} id="signintemp" onClick={handleToggle}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;

