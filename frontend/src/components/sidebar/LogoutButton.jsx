import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div>
			{!loading ? (
				<div className='py-[15px]'>
					<div className='w-full flex items-center justify-center cursor-pointer' title='Logout'>
						<BiLogOut onClick={logout} size={18} />
					</div>
					<p className='font-semibold text-xs text-center'>Đăng xuất</p>
				</div>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
