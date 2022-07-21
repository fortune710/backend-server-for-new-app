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
            this.media = media;
            this.responses = [];
            this.timestamp = new Date()
        }

    getData(){
        return {
            post_id: this.post_id,
            user_id: this.user_id,
            user_id: this.post_content,
            mosque_id: this.mosque_id,
            parent_id: this.parent_id,
            status: this.status,
            type: this.type,
            responses: this.responses,
            media: this.media,
            timestamp: this.timestamp 
        }
    }
   
}

module.exports = {
    Post: Post
}