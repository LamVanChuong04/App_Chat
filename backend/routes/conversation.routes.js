// routes/conversation.routes.js
import express from 'express';
import {
    deleteConversation,
    recoverConversation,
    starConversation,
    unstarConversation,
    getConversations,
} from '../controllers/conversation.controller.js'; // Cập nhật đường dẫn

const router = express.Router();

// Định nghĩa các route
router.get('/', getConversations);
router.delete('/:conversation_id', deleteConversation);
router.post('/:conversation_id/recover', recoverConversation);
router.post('/:conversation_id/star', starConversation);
router.post('/:conversation_id/unstar', unstarConversation);

export default router;
