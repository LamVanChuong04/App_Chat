import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import { MdDeleteOutline } from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import { useState } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [star, setStar] = useState(conversation.isStar);

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const deleteConversation = async () => {
		await fetch(`/api/conversations/delete/${conversation.conversation_id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		});
		window.location = '/';
	};

	const recoverConversation = async () => {
		await fetch(`/api/conversations/recover/${conversation.conversation_id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		});
		window.location = '/';
	};

	const handleStarConversation = async () => {
		await fetch(`/api/conversations/star/${conversation.conversation_id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		});
		window.location = '/';
	};

	const handleUnstarConversation = async () => {
		await fetch(`/api/conversations/unstar/${conversation.conversation_id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		});
		window.location = '/';
	};

	return (
		<>
			<li
				className={`group w-full h-[79px] border-b border-[#e6e6e6] hover:bg-[#f0f0f0] ${isSelected ? 'bg-[#f0f0f0]' : 'bg-white'
					} cursor-pointer`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='w-full px-[30px] py-[17px] flex items-center justify-between'>
					<div className='flex items-start justify-start gap-4'>
						<div className='relative size-[45px]'>
							<img
								src={conversation.profilePic}
								alt='user avatar'
								className='size-[45px] aspect-square bg-blue-400 rounded-full'
							/>
							<div
								className={`${isOnline ? 'bg-green-500' : 'bg-transparent'
									} absolute size-[15px] rounded-full top-0 right-0`}
							/>
						</div>

						<div>
							<p className='font-semibold'>{conversation.fullName}</p>
							<p className='text-[14px] opacity-80'>
								{conversation.lastMessage.message}
							</p>
						</div>
					</div>

					<div className='flex items-center justify-end gap-3'>
						<div className='block group-hover:hidden'>
							{conversation.isStar === true && (
								<IoStar size={20} className='text-yellow-500' />
							)}
						</div>
						<div
							className='hidden group-hover:block transition duration-300 p-2 rounded-md cursor-pointer'
							title='Đánh dấu'
							onClick={() => {
								if (star === true) handleUnstarConversation();
								else handleStarConversation();
								setStar(!star);
							}}
						>
							{star === false && <IoStarOutline size={20} />}
							{star === true && (
								<IoStar size={20} className='text-yellow-500' />
							)}
						</div>
						{conversation.isDelete === false && (
							<div
								className='hidden group-hover:block transition duration-300 p-2 rounded-md hover:bg-red-500 hover:text-white cursor-pointer'
								title='Xóa cuộc trò chuyện'
								onClick={() => {
									deleteConversation();
								}}
							>
								<MdDeleteOutline size={20} />
							</div>
						)}
						{conversation.isDelete === true && (
							<div
								className='hidden group-hover:block transition duration-300 p-2 rounded-md hover:bg-red-500 hover:text-white cursor-pointer'
								title='Khôi phục cuộc trò chuyện'
								onClick={() => {
									recoverConversation();
								}}
							>
								<FaUndo size={18} />
							</div>
						)}
					</div>
				</div>
			</li>
		</>
	);
};
export default Conversation;
