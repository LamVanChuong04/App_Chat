import useGetConversations from '../../hooks/useGetConversations';
import Conversation from './Conversation';

function StarConversation() {
	const { loading, conversations } = useGetConversations();
	return (
		<ul className='w-full'>
			{conversations
				.filter((item) => item.isStar === true)
				.map((conversation) => (
					<Conversation key={conversation._id} conversation={conversation} />
				))}

			{loading ? (
				<span className='loading loading-spinner mx-auto'></span>
			) : null}
		</ul>
	);
}

export default StarConversation;