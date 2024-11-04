import { useEffect } from 'react';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	console.log(selectedConversation);
	

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	const recoverConversation = async () => {
		await fetch(
			`/api/conversations/recover/${selectedConversation.conversation_id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
			}
		);
		window.location = '/';
	};

	return (
		<div className='h-screen'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<div className='h-screen'>
					{/* Header */}
					<div className='h-[79px] border-b-[1px] border-[#e6e6e6] px-[30px] py-[17px] flex items-center justify-start gap-4'>
						<img
							src={selectedConversation.profilePic}
							alt='profile pic'
							className='size-[37px] rounded-full'
						/>
						<div>
							<p className='text-[16px] leading-none font-semibold'>
								{selectedConversation.fullName}
							</p>
							{onlineUsers.includes(selectedConversation._id) && (
								<p className='italic text-[11px] leading-[17px] text-green-500'>
									Online
								</p>
							)}
							{!onlineUsers.includes(selectedConversation._id) && (
								<p className='italic text-[11px] leading-[17px] text-red-500'>
									Offline
								</p>
							)}
						</div>
					</div>
					<div className='mt-10 h-[calc(100%-200px)]'>
						<Messages />
					</div>
					<div className='w-full h-[1px] bg-[#e6e6e6]' />
					{selectedConversation.isDelete === true ? (
						<div className='text-sm h-[80px] flex flex-col items-center justify-center gap-1'>
							<p>Bạn hiện không thể trả lời cuộc trò chuyện này.</p>
							<p
								className='font-semibold cursor-pointer hover:underline underline-offset-2'
								onClick={() => {
									recoverConversation();
								}}
							>
								Khôi phục cuộc trò chuyện
							</p>
						</div>
					):<MessageInput />}
				</div>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='font-semibold flex flex-col items-center gap-5'>
				<TiMessages className='text-3xl md:text-6xl text-center' />
				<p className='text-4xl'>Xin chào {authUser.fullName} 👋</p>
				<p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
