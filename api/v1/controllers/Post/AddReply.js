const { FieldValue } = require('firebase-admin/firestore')
const { firebaseDatabase } = require('../../../config/nosql.db')
const { Post } = require('../../../models/Post');
const { Media } = require('../../../models/Media');
const { makeid } = require('../../../../helpers/randomid')

const AddReply = (req, res) => {
    const { user_id, parent_id, content } = req.body;
    const newPostRef = firebaseDatabase.collection('posts').doc(parent_id)


    const reply = {
        id: makeid(15),
        user_id: user_id,
        content: content
    }
        
    newPostRef.update({
        respones: FieldValue.arrayUnion(reply)
    })
    .then(()=> res.json({ response:'Post created sucessfully' }))
    .catch(() => res.json({ response:"Could not create post" }))

}


const AddMediaToCloudStorage = async() => {

}

module.exports = {
    AddReply: AddReply,
    AddMediaToCloud: AddMediaToCloudStorage
}