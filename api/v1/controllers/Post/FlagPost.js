const { firebaseDatabase } = require('../../../config/nosql.db')
const { Post } = require('../../../models/Post');


const FlagPost = (req, res) => {
    const { post_id } = req.body;

    const postRef = firebaseDatabase.collection('posts').doc(post_id)
    postRef.update({
        status: false
    })
}

module.exports = {
    FlagPost: FlagPost
}