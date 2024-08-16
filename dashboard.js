import { auth,db } from "./firebase.mjs";
import {
  onAuthStateChanged,
  signOut,
}  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';

onAuthStateChanged(auth, (user) => {
  console.log(user)
  if (!user) {
    console.log(user)
    window.location.href = "index.html";
  }
});

const logOut = document.getElementById("log-out");

logOut.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postContentElem = document.getElementById('post-content');
    const postsContainer = document.querySelector('.posts');
    
    // Reference to the Firestore collection
    const postsRef = collection(db, 'posts');

    // Function to render a post
    const renderPost = (post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('data-id', post.id);
        postElement.innerHTML = `
            <div class="post-header">
                <img src="img/profile-pic.webp" alt="User Profile Picture" class="post-profile-pic">
                <span class="post-user-name">John Doe</span>
                <button class="delete-btn">Delete</button>
            </div>
            <p class="post-content">${post.data.content}</p>
        `;
        postsContainer.appendChild(postElement);
    };

    // Add a new post to Firestore
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const postContent = postContentElem.value;
        if (!postContent.trim()) {
            return; // Do nothing if the post content is empty
        }
        
        try {
            await addDoc(postsRef, { content: postContent });
            postContentElem.value = ''; // Clear the textarea
        } catch (error) {
            console.error('Error adding post:', error);
        }
    });

    // Delete a post from Firestore
    postsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const postElement = event.target.closest('.post');
            const postId = postElement.getAttribute('data-id');
            
            try {
                await deleteDoc(doc(db, 'posts', postId));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });

    // Real-time listener for posts
    onSnapshot(postsRef, (snapshot) => {
        postsContainer.innerHTML = ''; // Clear existing posts
        snapshot.forEach((doc) => {
            renderPost({ id: doc.id, data: doc.data() });
        });
    });
});


