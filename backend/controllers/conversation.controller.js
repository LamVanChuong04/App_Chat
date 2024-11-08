// conversation.controller.js
import Conversation from '../models/conversation.model.js';

// Lấy danh sách cuộc trò chuyện
export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ isDelete: false }).populate('participants').populate('messages');
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu." });
    }
};

// Xóa cuộc trò chuyện
export const deleteConversation = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        const conversation = await Conversation.findById(conversation_id);
        if (conversation) {
            conversation.isDelete = true; // Đánh dấu là đã xóa
            await conversation.save();
            res.status(200).json({ message: "Cuộc trò chuyện đã được xóa." });
        } else {
            res.status(404).json({ message: "Cuộc trò chuyện không tìm thấy." });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa cuộc trò chuyện." });
    }
};

// Khôi phục cuộc trò chuyện
export const recoverConversation = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        const conversation = await Conversation.findById(conversation_id);
        if (conversation) {
            conversation.isDelete = false; // Khôi phục lại
            await conversation.save();
            res.status(200).json({ message: "Cuộc trò chuyện đã được khôi phục." });
        } else {
            res.status(404).json({ message: "Cuộc trò chuyện không tìm thấy." });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi khôi phục cuộc trò chuyện." });
    }
};

// Đánh dấu cuộc trò chuyện
export const starConversation = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        const conversation = await Conversation.findById(conversation_id);
        if (conversation) {
            conversation.isStar = true; // Đánh dấu
            await conversation.save();
            res.status(200).json({ message: "Cuộc trò chuyện đã được đánh dấu." });
        } else {
            res.status(404).json({ message: "Cuộc trò chuyện không tìm thấy." });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đánh dấu cuộc trò chuyện." });
    }
};

// Bỏ đánh dấu cuộc trò chuyện
export const unstarConversation = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        const conversation = await Conversation.findById(conversation_id);
        if (conversation) {
            conversation.isStar = false; // Bỏ đánh dấu
            await conversation.save();
            res.status(200).json({ message: "Cuộc trò chuyện đã được bỏ đánh dấu." });
        } else {
            res.status(404).json({ message: "Cuộc trò chuyện không tìm thấy." });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi bỏ đánh dấu cuộc trò chuyện." });
    }
};
