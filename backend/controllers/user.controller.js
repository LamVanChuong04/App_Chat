import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUserInformation = async (req, res) => {
	try {
		const { userIds } = req.body; // Danh sách user_id được gửi từ client

		if (!Array.isArray(userIds) || userIds.length === 0) {
			return res.status(400).json({ error: 'userIds must be a non-empty array' });
		}
		// Tìm tất cả người dùng với các ID được cung cấp
		const users = await User.find({ _id: { $in: userIds } });

		// Nếu không tìm thấy người dùng, trả về lỗi
		if (users.length === 0) {
			return res.status(404).json({ error: 'No users found' });
		}

		// Trả về thông tin người dùng
		res.status(200).json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Server error' });
	}
}
