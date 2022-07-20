class Post {
    constructor(post_id, user_id, mosque_id, 
        parent_id, post_content, status, type, responses, media){
            this.post_id = post_id;
            this.user_id = user_id;
            this.post_content = post_content;
            this.mosque_id = mosque_id;
            this.parent_id = parent_id;
            this.status = status;
            this.type = type;
            this.responses = responses;
            this.media = media;
            this.timestamp = new Date()
        }
   
}

module.exports = {
    Post: Post
}