class Media {
    constructor(id, post_id, type, link){
        this.id = id;
        this.post_id = post_id;
        this.type = type;
        this.link = link;
    }
}

module.exports = {
    Media: Media
}