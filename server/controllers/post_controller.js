const getPosts = (req, res) => {
    const db = req.app.get("db")

    console.log("getPosts hit")
    db.posts.get_posts().then(post => {
        console.log(post)
        res.status(200).send(post)
    })
}

const addPost = (req, res) => {
    const db = req.app.get("db")

    console.log(req.body.post)
    db.posts.add_post([req.body.userID, req.body.post]).then(param => {
        console.log(param)
        res.sendStatus(200)
    }).catch(err => res.status(500).send(err))

}
module.exports = {
    addPost,
    getPosts
};