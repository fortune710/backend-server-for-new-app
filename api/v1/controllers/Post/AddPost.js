const { firebaseDatabase } = require('config/nosql.db')
const { Post } = require('models/Post');
const { Media } = require('models/Media');
const { makeid } = require('../../../../helpers/randomid')

const { Storage } = require('@google-cloud/storage');

const AddPost = (req, res) => {
    const newPostRef = firebaseDatabase.collection('posts')
    const { user_id, mosque_id, content , media, media_type, link } = req.body;

    if(media !== null){
        const id = makeid(15) //ID for the post
        const postMedia = new Media(makeid(10), id, media_type, link)
        const newPost = new Post(id, user_id, mosque_id, id, true, 'post', {}, postMedia)
        
        newPostRef.doc(id).set(newPost)
    } else {
        const id = makeid(15) //ID for the post
        const newPost = new Post(id, user_id, mosque_id, id, content, true, 'post', [], postMedia)
        
        newPostRef.doc(id).set(newPost)

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