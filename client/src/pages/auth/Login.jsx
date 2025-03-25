import Bg from "../../assets/bg.jpg";
import logo from '../../assets/logo.png';
import google from '../../assets/google.png';
import github from '../../assets/github.png';
import { useState } from "react";
import { useDispatch } from "react-redux";
import LoginThunk from "../../store/Thunks/LoginThunk";

const LoginForm ={
    email : "",
    password : ""
}

export default function Login() {
    const [loginData, setLoginData] = useState(LoginForm)
    const dispatch = useDispatch()
    const HandleChange =  (e) => {
        setLoginData((prevData) =>({...prevData, [e.target.name] : e.target.value}))
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        console.log(loginData)
        const {username ,email ,password} = loginData
        if (!username) return setError({ name: "username", message: "Username is required" });
        if (!email) return setError({ name: "email", message: "Email is required" });
        if (!email.includes("@gmail.com")) return setError({ name: "email", message: "Invalid Email address" });
        if (!password) return setError({ name: "password", message: "Password is required" });
        if (password.length < 8) return setError({ name: "password", message: "Password is too short (min: 8 characters)" });
    
        try {
          const LoginResponse = await dispatch(LoginThunk(loginData));
          console.log(LoginResponse);
          
          if (LoginResponse?.payload?.success) {
            toast.success(LoginResponse?.payload?.message);
            setLoginData(SignupForm);
        }
    //    // Reset form
    //         // authDispatch({ type: "otp" }); // Navigate to OTP step
    //       } else {
    //         // toast.error(LoginResponse || "Registration failed");
    //       }
        } catch (err) {
          console.log(err);
          
          toast.error("Error during registration");
        }
      }
      async function HandleGoogleLogin(){
        window.location.href = `${import.meta.env.VITE_BACKEND_URL_LOCAL}/auth/google`;
    }
    async function HandleGithubLogin(){
      window.location.href = `${import.meta.env.VITE_BACKEND_URL_LOCAL}/auth/github/callback`;
  }
    return(
        <>
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">
    {/* Left Side - Image Section */}
    <div className="w-full md:w-1/2 lg:w-7/12 relative">
        <img 
            src={Bg} 
            className="w-full h-64 md:h-screen object-cover object-center" 
            alt="Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-blue-600 to-transparent"></div>
    </div>

    {/* Right Side - Login Form */}
    <div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 lg:p-20 flex">
        <form className="w-full rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-center bg-white ">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <img src={logo} alt="Bid Deal Logo" className='w-10 h-10 object-cover' />
                <h1 className='tracking-tight font-black text-2xl text-gray-800'>Bid Deal</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8">
                Don't have an account?{' '}
                <span className="text-blue-600 underline font-semibold cursor-pointer hover:text-blue-700">
                    Sign up here
                </span>
            </p>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-4 mb-8">
                            <button onClick={HandleGoogleLogin}
                                type="button" 
                                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors"
                            >
                                <img src={google} className="w-6 h-6" alt="" />
                                <span className="text-gray-700 font-medium">Continue with Google</span>
                            </button>
            
                            <button onClick={HandleGithubLogin}
                                type="button" 
                                className="w-full flex items-center justify-center gap-3 bg-gray-600 border border-gray-800 rounded-lg py-3 px-4 hover:bg-gray-200 transition-colors"
                            >
                                <img src={github} className="w-6 h-6" alt="" />
                                <span className="text-black font-medium">Continue with GitHub</span>
                            </button>
                        </div>

            {/* Divider */}
            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-gray-500 text-sm">Or log in with email</span>
                </div>
            </div>

            {/* Login Form Fields */}
            <div className="space-y-6 w-full">
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input 
                        value={LoginForm.email}
                        onChange={HandleChange}
                        name="email"
                        type="email" 
                        id="email" 
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        value={LoginForm.password}
                        onChange={HandleChange}
                        name="password"
                        type="password" 
                        id="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                    </a>
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
                Login
            </button>

            {/* Security Note */}
            <p className="mt-6 text-center text-xs text-gray-500">
                Your data is protected with 256-bit SSL encryption
            </p>
        </form>
    </div>
</div>
        </>
    )
}