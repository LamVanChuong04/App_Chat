import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

function Friends() {
  const [userOnline, setUserOnline] = useState([]);
  const { setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getUserOnlineInformation = async () => {
      const body = { userIds: onlineUsers };
      const res = await fetch('/api/users/user-information', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setUserOnline(data);
    };
    getUserOnlineInformation();
  }, [onlineUsers]);

  return (
    <div>
      <p className='text-xs px-[30px]'>
        Người liên hệ đang hoạt động ({onlineUsers.length - 1})
      </p>
      <ul className='mt-5 divide-y-[1px] divide-[#e6e6e6]'>
        {userOnline
          .filter((item) => item._id !== authUser._id)
          .map((user, idx) => (
            <li key={idx} className='w-full h-[70px] hover:bg-[#f0f0f0] cursor-pointer' onClick={()=>{setSelectedConversation(user)}}>
              <div className='px-[30px] py-[17px] flex items-center justify-start gap-4'>
                <div className='relative'>
                  <img
                    src={user.profilePic}
                    alt='profile pic'
                    className='size-[40px] bg-red-400 rounded-full'
                  />
                  <div className='bg-green-500 absolute size-[15px] rounded-full top-0 right-0' />
                </div>
                <div>
                  <p className='font-semibold'>{user.fullName}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Friends;
