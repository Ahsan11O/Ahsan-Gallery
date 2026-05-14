// Store logged-in user
let currentUser = null;

// Visitor Counter
if (!localStorage.getItem("visitorCount")) {
    localStorage.setItem("visitorCount", 0);
}

let visitorCount = parseInt(localStorage.getItem("visitorCount")) + 1;
localStorage.setItem("visitorCount", visitorCount);

// Display Visitor Count
function displayVisitorCount() {
    let ownerView = document.getElementById("visitor-count");

    if (ownerView) {
        ownerView.innerText = `👁️ Visitors: ${visitorCount}`;
    }
}

// Signup Function
function signUp() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username && password) {

        if (localStorage.getItem(username)) {
            alert("Username already exists!");
        } else {
            localStorage.setItem(username, password);
            alert("Signup successful!");
        }

    } else {
        alert("Fill all fields.");
    }
}

// Login Function
function loginUser() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (localStorage.getItem(username) === password) {

        currentUser = username;

        alert(`Welcome ${username}!`);

        document.getElementById("gallery-section").style.display = "block";

        loadImages();

    } else {
        alert("Invalid login.");
    }
}

// Load 4 Images
function loadImages() {

    let gallery = document.querySelector(".gallery-container");

    gallery.innerHTML = "";

    for (let i = 1; i <= 4; i++) {

        let imgDiv = document.createElement("div");

        imgDiv.classList.add("image-item");

        imgDiv.innerHTML = `
            <div class="image-frame">
                <img src="images/pic${i}.jpg" alt="Image ${i}">
                
                <button class="like-btn" onclick="likeImage(this)">
                    ❤️ Like
                </button>

                <a href="images/pic${i}.jpg" 
                   class="download-btn" 
                   download>
                   📥 Download
                </a>
            </div>
        `;

        gallery.appendChild(imgDiv);
    }
}

// Like Button
function likeImage(button) {

    button.innerText = "❤️ Liked!";

    button.style.transform = "scale(1.2)";

    button.style.transition = "0.3s";
}

// Show / Hide Password
function togglePassword(fieldId) {

    let passwordField = document.getElementById(fieldId);

    passwordField.type =
        passwordField.type === "password"
        ? "text"
        : "password";
}

// Run Visitor Counter
displayVisitorCount();
