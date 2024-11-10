import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
import MessageOptions from './MessageOptions'; // Import MessageOptions

const MessageInput = ({ receiverId }) => { // Nhận receiverId từ props
	const [message, setMessage] = useState('');
	const { loading, sendMessage } = useSendMessage();

	// State để lưu trữ các tùy chọn
	const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
	const [color, setColor] = useState('#000000');
	const [fontSize, setFontSize] = useState(16);

	const handleSubmit = async (e) => {
		e.preventDefault();
		

		// Tạo đối tượng tin nhắn với các thuộc tính cần thiết
		const messageData = {
			text: message, // Nội dung tin nhắn
			fontFamily,
			color,
			fontSize,
		};

		// Gửi messageData đến server
		try {
			await sendMessage(messageData, receiverId); // Gọi hàm gửi tin nhắn
			setMessage(''); // Xóa nội dung tin nhắn sau khi gửi
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<div>
			<MessageOptions 
				onFontFamilyChange={setFontFamily} 
				onColorChange={setColor} 
				onFontSizeChange={setFontSize} 
			/>
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
		</div>
	);
};

export default MessageInput;
