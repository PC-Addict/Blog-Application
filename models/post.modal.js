const { readFile, writeFile } = require('../helper/file.helper');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const PATH = path.join(__dirname, '..', 'data', 'post.data.json');

// return all posts in db
exports.findAll = async function () {
    var postsObj = await readFile(PATH);
    var posts = Object.keys(postsObj).map(postKey => {
        return {
            ...postsObj[postKey],
            id: postKey
        };
    });
    return posts;
}

// return the users posts
exports.getAllPostsForUser = async function (author) {
    console.log(author);

    var postsObj = await readFile(PATH);
    var posts = Object.keys(postsObj)
        .map(postKey => {
            return {
                ...postsObj[postKey],
                id: postKey
            };
        })
        .filter(post => post.author === author.toLowerCase());

    return posts;
}

// return post based on id
exports.findById = async function (id) {
    var posts = await readFile(PATH);
    return { ...posts[id], id: id };
}


// create new post
exports.create = async function (title, description, fileName, author) {

    var data = {
        title,
        description,
        author: author.toLowerCase(),
        imageUrl: `http://localhost:3000/uploads/${fileName}`,
        createdAt: new Date().toISOString()
    };

    var posts = await readFile(PATH);
    var id = uuidv4();
    posts[id] = data;

    await writeFile(PATH, posts);
}

//update the post based on id 
exports.update = async function (id, title, description) {
    var posts = await readFile(PATH);
    posts[id] = { ...posts[id], title, description };
    await writeFile(PATH, posts);
}


//  delete  post based on id 
exports.delete = async function (id) {
    var posts = await readFile(PATH);
    var newPosts = _.omit(posts, id);
    await writeFile(PATH, newPosts);
}