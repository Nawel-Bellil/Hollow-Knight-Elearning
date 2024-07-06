const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum');

router.post('/create', forumController.createForumPost);
router.get('/course/:courseId', forumController.getForumPostsByCourse);
router.delete('/:id', forumController.deleteForumPost);

module.exports = router;
