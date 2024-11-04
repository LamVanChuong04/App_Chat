import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
	const [message, setMessage] = useState('');
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage('');
	};

	return (
		<form
			className='w-full py-[17px] px-[30px] flex items-center justify-between gap-5'
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				className='w-full h-[43px] py-[10px] px-[15px] border-[1px] rounded-md focus:outline-none bg-white focus:border-blue-500 transition duration-200'
				placeholder='Nhập tin nhắn'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type='submit' className='flex items-center'>
				{loading ? (
					<div className='loading loading-spinner'></div>
				) : (
					<BsSend
						size={17}
						className='rounded-md text-white w-[60px] h-[43px] py-[13px] bg-blue-500 transition duration-200 hover:bg-blue-700'
					/>
				)}
			</button>
		</form>
	);
};
export default MessageInput;
