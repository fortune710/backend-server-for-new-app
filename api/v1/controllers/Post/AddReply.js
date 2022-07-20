const { FieldValue } = require('firebase-admin/firestore')
const { firebaseDatabase } = require('config/nosql.db')
const { Post } = require('models/Post');
const { Media } = require('models/Media');
const { makeid } = require('../../../../helpers/randomid')

const AddReply = (req, res) => {
    const { user_id, mosque_id, media, media_type, link, parent_id, content } = req.body;
    const newPostRef = firebaseDatabase.collection('posts').doc(parent_id)


    if(media !== null){

        const id = makeid(15) //ID for the post
        const postMedia = new Media(makeid(10), id, media_type, link)
        const reply = new Post(id, user_id, mosque_id, parent_id, content, true, 'post', [], postMedia)
        
        newPostRef.update({
            respones: FieldValue.arrayUnion(reply)
        })
    } else {
        const id = makeid(15) //ID for the post
        const reply = new Post(id, user_id, mosque_id, id, true, 'post', {}, postMedia)
        
        newPostRef.update({
            respones: FieldValue.arrayUnion(reply)
        })

    }

}


const AddMediaToCloudStorage = async() => {

}

module.exports = {
    AddReply: AddReply,
    AddMediaToCloud: AddMediaToCloudStorage
}