// Store logged-in user
let currentUser = null;

// Visitor Counter (Only visible to owner)
if (!localStorage.getItem("visitorCount")) {
    localStorage.setItem("visitorCount", 0);
}
let visitorCount = parseInt(localStorage.getItem("visitorCount")) + 1;
localStorage.setItem("visitorCount", visitorCount);

// Function to display visitor count (Only for owner)
function displayVisitorCount() {
    let ownerView = document.getElementById("visitor-count");
    if (ownerView) {
        ownerView.innerText = `👁️ Visitors: ${visitorCount}`;
    }
}


// Function to handle signup
function signUp() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username && password) {
        if (localStorage.getItem(username)) {
            alert("Username already exists! Try another.");
        } else {
            localStorage.setItem(username, password);
            alert("Signup successful! Now log in.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to handle login
function loginUser() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (localStorage.getItem(username) === password) {
        currentUser = username;
        alert(`Welcome, ${username}!`);
        document.getElementById("gallery-section").style.display = "block";
        document.getElementById("upload-section").style.display = "block";
    } else {
        alert("Invalid login. Try again.");
    }
}

// Function to upload an image (Only if logged in)
function uploadImage() {
    if (!currentUser) {
        alert("You must be logged in to upload images.");
        return;
    }

    let file = document.getElementById("imageUpload").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            addImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Function to add an image to the gallery
function addImage(imageURL) {
    let gallery = document.querySelector(".gallery-container");

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("image-item");

    imgDiv.innerHTML = `
        <div class="image-frame">
            <img src="${imageURL}" alt="Uploaded Image">
            <button class="like-btn" onclick="likeImage(this)">❤️ Like</button>
            <a href="${imageURL}" class="download-btn" download>📥 Download</a>
        </div>
    `;

    gallery.appendChild(imgDiv);
}

// Function to like an image
function likeImage(button) {
    button.innerText = "❤️ Liked!";
    button.style.transform = "scale(1.2)";
    button.style.transition = "0.3s";
}

// Function to toggle password visibility
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Call visitor counter function on load
displayVisitorCount();
