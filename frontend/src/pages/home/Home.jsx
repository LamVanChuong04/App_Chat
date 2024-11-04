import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
	return (
		<div className='w-full h-full flex items-start justify-start'>
			<div className='w-[453px] h-screen'><Sidebar /></div>
			<div className='w-[1px] h-full bg-[#e6e6e6]' />
			<div className='w-[calc(100%-454px)]'><MessageContainer /></div>
		</div>
	);
};
export default Home;
