const express = require('express');
const router = express.Router();
const forum = require('../controllers/forum');

router.post('/create', forum.createForumPost);
router.get('/course/:courseId', forum.getForumPostsByCourse);
router.delete('/:id', forum.deleteForumPost);

module.exports = router;
