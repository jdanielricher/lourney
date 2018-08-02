const getPosts = (req, res) => {
    const db = req.app.get("db")
    db.posts.get_posts().then(post => {
        console.log("GET POST", post)
        res.status(200).send(post)
    })
}

const addPost = (req, res) => {
    const db = req.app.get("db")
    db.posts.add_post([req.body.userID, req.body.post]).then(param => {
        console.log(param)
        res.sendStatus(200)
    }).catch(err => res.status(500).send(err))

}

const deletePost = (req, res) => {
    console.log('delete post hit', req.params)
    const db = req.app.get('db');
    db.posts.delete_post([req.params.userId, req.params.postId])
        .then(() => res.status(200).send("Post successfully deleted"))
        .catch(err => res.status(500).send("Something went terribly wrong"));
};

const updatePost = (req, res) => {
    console.log("update post hit", req.params, req.body)
    const db = req.app.get('db');
    db.posts.update_post([req.body.post, req.params.userId, req.params.postId])
        .then(() => res.status(200).send("Post successfully updated"))
        .catch(err => res.status(500).send("Something went terribly wrong"));

}
module.exports = {
    addPost,
    getPosts,
    deletePost,
    updatePost
};