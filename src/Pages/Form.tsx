const Form = () => {
  return (
    <div className="bg-white px-10 py-12 rounded-3xl">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome Back! Please enter your details
      </p>
      <div className="mt-8">
        <div>
          <label htmlFor="" className="text-lg font-medium ">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email "
            className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="" className="text-lg font-medium ">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password "
            className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
          />
        </div>

        <div className="flex mt-8 justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label
              className="ml-2 text-sm font-medium text-base "
              for="remember"
            >
              Remember me for 30 days
            </label>
          </div>
          <button className="font-medium text-base text-violet-800">
            Forgot Password
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button className=" active:scale-[.98]  hover:scale-[1.01] active:duration-75 transition-all rounded-xl py-2  bg-violet-600 text-white text-lg font-bold">
            Sign in
          </button>
          <button>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
