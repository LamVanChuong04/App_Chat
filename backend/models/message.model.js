import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		fontFamily: {
			type: String,
			default: 'Arial, sans-serif', // Giá trị mặc định
		},
		color: {
			type: String,
			default: '#000000', // Giá trị mặc định
		},
		fontSize: {
			type: Number,
			default: 16, // Giá trị mặc định
		},
	},
	{ timestamps: true } // Tự động thêm createdAt và updatedAt
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
