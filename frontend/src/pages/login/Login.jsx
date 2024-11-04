import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import logo from '/logo.png';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='w-full h-full flex flex-col items-center justify-start pt-20'>
			<div className='flex items-center justify-center gap-3 mb-36'>
				<img
					src={logo}
					alt='Chat VDH Logo'
					className='h-[40px] object-contain'
				/>
				<h2 className='text-2xl font-bold uppercase'>Chat VDH</h2>
			</div>
			<div>
				<div className='mx-auto flex w-[600px] flex-col items-center justify-center border rounded-lg py-16'>
					<h1 className='text-3xl font-bold'>Welcome back</h1>
					<form
						className='mt-14 flex flex-col items-start justify-start gap-5'
						onSubmit={handleSubmit}
					>
						<div className='relative h-11 w-full min-w-[400px] mb-3'>
							<input
								placeholder='Enter your username'
								className='border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder:opacity-0 focus:border-gray-500 focus:outline-0 focus:placeholder:opacity-100 disabled:border-0'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label className="after:content[''] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent">
								{' '}
								Username{' '}
							</label>
						</div>

						<div className='relative h-11 w-full min-w-[400px]'>
							<input
								placeholder='Enter your password'
								type='password'
								className='border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder:opacity-0 focus:border-gray-500 focus:outline-0 focus:placeholder:opacity-100 disabled:border-0'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label className="after:content[''] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent">
								{' '}
								Password{' '}
							</label>
						</div>
						<p>
							{`Dont't have an account? `}
							<Link
								to='/signup'
								className='hover:underline hover:text-blue-600 inline-block my-1'
							>
								Sign up
							</Link>
						</p>

						<div>
							<button
								className='btn btn-sm mt-2 w-ful min-w-[400px] h-[45px]'
								disabled={loading}
							>
								{loading ? (
									<span className='loading loading-spinner '></span>
								) : (
									'Đăng nhập'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
