import './css/index.css';
import $ from 'jquery';


const allUsers = $('#allUsers');
const homeLink = $('#homeLink');
const currentComments = $('#currentComments');
const blogName = $('#blogName');
const bogSite = $('#bogSite');
const blogbusiness = $('#blogbusiness');
const description = $('#description');
const blogInfo = $('.blogInfo');

let listOfUsers = [];

class BlogUser {

    constructor(id, name, website, company) {
        this.id = id;
        this.name = name;
        this.website = website;
        this.company = company;
    }

    setUpPosts() {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.id}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(postData => {
                let postDivs = getPostDiv(postData, this);
                this.posts = postData;
                this.postDiv = postDivs;
            })
            .catch(err => console.log(err));
    }

    setUpComments(post) {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(commentData => {
                let commentHeader = $(` 
                    <div  id="${this.id}">
                   <div class="blogInfo">
                     <h2 class="blogName">${this.name}</h2>
                     <div class="businessDiv">
                       <h4 class="description">${this.company.catchPhrase}</h4>
                       <h2>${post.title}</h2>
                       <p>${post.body}</p>
                    </div>
                    </div>
                   </div>
            `);
                commentData.forEach((comment) => {
                    let currentComment = $(`
                    <div class="commentDiv">
                        <h2 class="commentsName">${comment.name}<h2>
                        <h5 class="commentsBody">${comment.body}<h5>
                        <h3 class="commentsEmail">${comment.email}<h3>
                    </div>
                `);
                    currentComment.appendTo(commentHeader);
                })
                commentHeader.appendTo(currentComments);
            })
            .catch(err => console.log(err));
    }
}

function getUserList() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(r => {
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            return r.json();
        })
        .then(userData => {
            listOfUsers = userData.map((user) => {
                return new BlogUser(user.id, user.name, user.website, user.company)
            });
            listOfUsers.forEach((BlogUser) => {
                BlogUser.setUpPosts();
            });
            setUpUsers(listOfUsers);
        })
        .catch(err => console.log(err));
}

function setUpUsers(users) {
    users.forEach((user) => {
        let currentUser = $(` 
                    <div  id="${user.id}">
                   <div class="blogInfo">
                     <h2 class="blogName">${user.name}</h2>
                     <a class="bogSite" href="${user.website}">${user.website}</a>
                     <div class="businessDiv">
                       <h3 class="blogbusiness">${user.company.name}</h3>
                       <h4 class="description">${user.company.catchPhrase}</h4>
                    </div>
                    </div>
                   </div>
         `);
        currentUser.appendTo(allUsers).on('click', () => {
            user.postDiv.appendTo($(`#${user.id}`))
            user.postDiv.show();
        });
    });
}

function getPostDiv(posts, user) {
    let postDiv = $(`<div class="postInfo">
                    </div>`)
    posts.forEach((post) => {
        let currentPost = $(`
            <div class="posts" id="post${post.id}">
                <h2>${post.title}</h2>
                <h4>${post.body}</h4>
            </div>
        `);
        $(`<button class="commentButton">Comments</button>`).appendTo(currentPost).on('click', () => {
            console.log('clicked!', post.id);
            hideUsers();
            user.setUpComments(post);
        });
        currentPost.appendTo(postDiv);
    });
    return postDiv;
}

function hideAll(userList) {
    userList.forEach(user => {
        user.postDiv.hide();
    });
}

function hideUsers() {
    allUsers.hide();
}

homeLink.on('click', () => {
    hideAll(listOfUsers);
    currentComments.empty();
    allUsers.show();
});

getUserList();
