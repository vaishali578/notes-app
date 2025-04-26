import React from 'react';

const AuthForm = ({ authMode, authData, setAuthData, handleAuthSubmit, setAuthMode }) => {
  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleAuthSubmit}
        className="bg-[#1f2937] text-white shadow-xl rounded-2xl p-8 w-[90%] sm:w-[380px] h-[500px] flex flex-col justify-between border border-indigo-500"
      >
        <h2 className="text-3xl font-bold text-center mb-2 uppercase tracking-wider text-indigo-300">
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={authData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            value={authData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-bold py-2 rounded-lg hover:scale-105 shadow-md"
        >
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center mt-4 text-sm">
          {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
          <button
            type="button"
            className="underline font-semibold text-indigo-300 hover:text-indigo-100"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          >
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
