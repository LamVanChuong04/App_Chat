import { useState } from 'react';
import Conversations from './Conversations';
import Friends from './Friends';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';
import {
	IoChatboxEllipsesOutline,
	IoChatbubbleEllipsesOutline,
	IoPeopleOutline,
	IoStarOutline,
} from 'react-icons/io5';
import { BiRecycle } from 'react-icons/bi';
import { useAuthContext } from '../../context/AuthContext';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { longDateFormat } from '../../utils/dateServices';
import RecycleBin from './RecycleBin';
import StarConversation from './StarConversation';

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { authUser } = useAuthContext();
	const [currentTab, setCurrentTab] = useState('Đoạn chat');
	const tabs = [
		{ id: 1, label: 'Đoạn chat', icon: IoChatbubbleEllipsesOutline },
		{ id: 2, label: 'Đang hoạt động', icon: IoPeopleOutline },
		{ id: 3, label: 'Đánh dấu', icon: IoStarOutline },
		{ id: 4, label: 'Đã xóa gần đây', icon: BiRecycle },
	];

	return (
		<>
			<div className='h-full flex items-start justify-start'>
				<div className='h-full w-[100px] flex flex-col justify-between'>
					<div>
						<div className='flex items-center justify-center w-full py-[25px] mb-[16px]'>
							<IoChatboxEllipsesOutline size={30} />
						</div>
						<ul>
							{tabs.map((tab) => (
								<li
									key={tab.id}
									className={`${currentTab === tab.label ? 'bg-[#e6e6e6]' : ''
										} rounded-md mx-5 my-[5px]  py-[15px] cursor-pointer flex-col flex items-center justify-center`}
									onClick={() => {
										setCurrentTab(tab.label);
									}}
									title={tab.label}
								>
									<div className='w-full flex items-center justify-center'>
										<tab.icon size={18} />
									</div>
									<p className='font-semibold text-xs text-center'>{tab.label}</p>
								</li>
							))}
						</ul>
					</div>
					<div className='mx-5'>
						<div className='bg-[#e6e6e6] rounded-md my-[5px]'>
							<LogoutButton />
						</div>
						<div className='py-[25px]'>
							{authUser.profilePic ? (
								<img
									src={authUser.profilePic}
									alt='profile pic'
									className='size-[60px] object-cover cursor-pointer hover:opacity-80 transition duration-200'
									onClick={onOpen}
									title='Xem thông tin'
								/>
							) : (
								<div
									className='size-[60px] rounded-full bg-red-500 cursor-pointer hover:opacity-80 transition duration-200'
									onClick={onOpen}
									title='Xem thông tin'
								/>
							)}
						</div>
					</div>
				</div>
				<div className='w-[1px] h-full bg-[#e6e6e6]' />
				<div className='h-[calc(100%-175px)] w-[calc(100%-101px)]'>
					<p className='text-[22px] leading-[80px] font-semibold px-[30px]'>
						{currentTab}
					</p>
					{currentTab !== 'Đã xóa gần đây' && currentTab !== 'Đánh dấu' && (
						<SearchInput />
					)}
					<div className='max-h-full overflow-y-scroll w-full'>
						{currentTab === 'Đoạn chat' && <Conversations />}
						{currentTab === 'Đang hoạt động' && <Friends />}
						{currentTab === 'Đã xóa gần đây' && <RecycleBin />}
						{currentTab === 'Đánh dấu' && <StarConversation />}
					</div>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Thông tin cá nhân</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className='flex flex-col items-center justify-start gap-3'>
							{authUser.profilePic ? (
								<img
									src={authUser.profilePic}
									alt='profile pic'
									className='size-[140px] object-cover cursor-pointer hover:opacity-80 transition duration-200'
									onClick={onOpen}
									title='Xem thông tin'
								/>
							) : (
								<div
									className='size-[140px] rounded-full bg-red-500 cursor-pointer hover:opacity-80 transition duration-200'
									onClick={onOpen}
									title='Xem thông tin'
								/>
							)}
							<p>
								Tên người dùng:{' '}
								<span className='font-bold'>{authUser.username}</span>
							</p>
							<p>
								Tên đầy đủ:{' '}
								<span className='font-bold'>{authUser.fullName}</span>
							</p>
							<p>
								Giới tính:{' '}
								<span className='font-bold'>
									{authUser.gender === 'male' ? 'Nam' : 'Nữ'}
								</span>
							</p>
							<p>
								Ngày tạo tài khoản:{' '}
								<span className='font-bold'>
									{longDateFormat(authUser.createdAt)}
								</span>
							</p>
						</div>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='red' onClick={onClose}>
							Đóng
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Sidebar;
