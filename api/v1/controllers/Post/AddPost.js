const { firebaseDatabase } = require('../../../config/nosql.db')
const { Post } = require('../../../models/Post');
const { Media } = require('../../../models/Media');
const { makeid } = require('../../../../helpers/randomid')

const { Storage } = require('@google-cloud/storage');

const AddPost = (req, res) => {
    const newPostRef = firebaseDatabase.collection('posts')
    const { user_id, mosque_id, content , media, media_type, link } = req.body;

    if(!user_id || !mosque_id){
        res.json({ response: 'Data missing!' })
        return
    } else {
        const id = makeid(15) //ID for the post
        const postMedia = new Media(makeid(10), id, media_type, link)
        //const newPost = new Post(id, user_id, mosque_id, id, true, 'post', postMedia.getData())
        
        const newPost = req.body
        newPost.timestamp = new Date(),
        newPost.responses = []

        newPostRef.doc(id).set(newPost)
        .then(()=> res.json({ response:'Post created sucessfully' }))
        .catch(() => res.json({ response:"Could not create post" }))

    }
}

const storage = new Storage({
    projectId: 'iiqama',
    keyFilename: 'api/config/iiqama-firebase-adminsdk-91fjn-daa294331a.json'
})

const AddMediaToCloudStorage = async() => {

}

module.exports = {
    AddPost: AddPost,
    AddMediaToCloud: AddMediaToCloudStorage
}