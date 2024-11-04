import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Nhập tối thiểu 3 ký tự");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("Không tìm thấy người dùng");
	};
	return (
		<form onSubmit={handleSubmit} className='w-full py-[17px] mb-[18px] px-[30px]'>
			<input
				type='text'
				placeholder='Nhập tên người dùng cần tìm kiếm'
				className="w-[290px] h-[43px] py-[10px] px-[15px] border-[1px] rounded-md focus:outline-none bg-white focus:border-blue-500 transition duration-200" 
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</form>
	);
};
export default SearchInput;