const getPosts = (req, res) => {
    const db = req.app.get("db")

    // console.log("getPosts hit")
    db.posts.get_posts().then(post => {
        console.log("GET POST", post)
        res.status(200).send(post)
    })
}

const addPost = (req, res) => {
    const db = req.app.get("db")

    // console.log(req.body.post)
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

module.exports = {
    addPost,
    getPosts,
    deletePost
};