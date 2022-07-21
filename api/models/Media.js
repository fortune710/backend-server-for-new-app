class Media {
    constructor(id, post_id, type, link){
        this.id = id;
        this.post_id = post_id;
        this.type = type;
        this.link = link;
    }

    getData(){
        return{
            id: this.id,
            post_id: this.post_id,
            type: this.type,
            link: this.link
        }
    }
}

module.exports = {
    Media: Media
}