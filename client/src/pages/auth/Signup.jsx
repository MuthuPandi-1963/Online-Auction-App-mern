import Bg from "../../assets/bg.jpg";
import logo from '../../assets/logo.png';
import google from '../../assets/google.png';
import github from '../../assets/github.png';
import { useState } from "react";
import RegisterThunk from "../../store/Thunks/RegisterThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignupForm ={
    username : "",
    email : "",
    password : ""
}
const Signup = () => {
    const [signupData, setSignupData] = useState(SignupForm)
    const dispatch = useDispatch()
    const HandleChange =  (e) => {
        setSignupData((prevData) =>({...prevData, [e.target.name] : e.target.value}))
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        console.log(signupData)
        const {username ,email ,password} = signupData
        if (!username) return setError({ name: "username", message: "Username is required" });
        if (!email) return setError({ name: "email", message: "Email is required" });
        if (!email.includes("@gmail.com")) return setError({ name: "email", message: "Invalid Email address" });
        if (!password) return setError({ name: "password", message: "Password is required" });
        if (password.length < 8) return setError({ name: "password", message: "Password is too short (min: 8 characters)" });
    
        try {
          const RegisterResponse = await dispatch(RegisterThunk(signupData));
          console.log(RegisterResponse);
          
          if (RegisterResponse?.payload?.success) {
            toast.success(RegisterResponse?.payload?.message);
            setSignupData(SignupForm);
        }
    //    // Reset form
    //         // authDispatch({ type: "otp" }); // Navigate to OTP step
    //       } else {
    //         // toast.error(RegisterResponse || "Registration failed");
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
  return (
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

    {/* Right Side - Form Section */}
    <div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 lg:p-20 flex">
        <form  onSubmit={HandleSubmit}
        className="w-full rounded-2xl  md:p-10 transition-all duration-300 flex flex-col justify-center bg-white ">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-2 mb-3">
                <img src={logo} alt="Bid Deal Logo" className='w-10 h-10 object-cover' />
                <h1 className='tracking-tight font-black text-2xl text-gray-800'>Bid Deal</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>
            <p className="text-center text-gray-600 mb-8">
                Already have an account?{' '}
                <span className="text-blue-600 underline font-semibold cursor-pointer hover:text-blue-700">
                    Login Here
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
                    <span className="px-2 bg-white text-gray-500 text-sm">Or sign up with email</span>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 w-full">
            <div className="space-y-6 w-full">
                <div className="w-full">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>
                    <input 
                        value={signupData.username}
                        onChange={HandleChange}
                        type="text" 
                        name="username"
                        id="username" 
                        placeholder="Enter your username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input 
                        value={signupData.email}
                        onChange={HandleChange}
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        value={signupData.password}
                        onChange={HandleChange}
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center w-full">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    </label>
                </div>
            </div>
            </div>

            <button 
                type="submit" 
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
                Create Account
            </button>
        </form>
    </div>
</div>
  );
};

export default Signup;
