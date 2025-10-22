
const EMAIL = "java25@fake.se";
const ADMIN_EMAIL = "admin@fake.se";
// auth
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// loginbutton
const loginBtn = document.createElement("button");
loginBtn.textContent = "Admin login";
loginBtn.style.position = "fixed";
loginBtn.style.right = "32px";
loginBtn.style.bottom = "32px";
loginBtn.style.zIndex = 1001;
loginBtn.style.background = "#007bff";
loginBtn.style.color = "white";
loginBtn.style.border = "none";
loginBtn.style.borderRadius = "8px";
loginBtn.style.padding = "12px 20px";
loginBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
loginBtn.style.cursor = "pointer";
document.body.appendChild(loginBtn);

// modal
const modalBg = document.createElement("div");
modalBg.style.position = "fixed";
modalBg.style.top = 0;
modalBg.style.left = 0;
modalBg.style.width = "100vw";
modalBg.style.height = "100vh";
modalBg.style.background = "rgba(0,0,0,0.3)";
modalBg.style.display = "none";
modalBg.style.zIndex = 2000;

const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.left = "50%";
modal.style.top = "50%";
modal.style.transform = "translate(-50%, -50%)";
modal.style.background = "white";
modal.style.padding = "32px 24px";
modal.style.borderRadius = "12px";
modal.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
modal.style.display = "flex";
modal.style.flexDirection = "column";
modal.style.alignItems = "center";
modal.style.minWidth = "320px";

const closeModalBtn = document.createElement("button");
closeModalBtn.textContent = "Stäng";
closeModalBtn.style.marginTop = "16px";
closeModalBtn.style.background = "#dc3545";
closeModalBtn.style.color = "white";
closeModalBtn.style.border = "none";
closeModalBtn.style.borderRadius = "6px";
closeModalBtn.style.padding = "8px 16px";
closeModalBtn.style.cursor = "pointer";

const passInput = document.createElement("input");
passInput.type = "password";
passInput.placeholder = "Lösenord";
passInput.style.marginBottom = "12px";
passInput.style.width = "100%";
passInput.style.padding = "8px";
passInput.style.borderRadius = "6px";
passInput.style.border = "1px solid #ccc";

const doLoginBtn = document.createElement("button");
doLoginBtn.textContent = "Logga in";
doLoginBtn.style.background = "#007bff";
doLoginBtn.style.color = "white";
doLoginBtn.style.border = "none";
doLoginBtn.style.borderRadius = "6px";
doLoginBtn.style.padding = "8px 16px";
doLoginBtn.style.cursor = "pointer";

const loginError = document.createElement("div");
loginError.style.color = "#dc3545";
loginError.style.marginBottom = "8px";
loginError.style.display = "none";

modal.appendChild(loginError);
modal.appendChild(passInput);
modal.appendChild(doLoginBtn);
modal.appendChild(closeModalBtn);
modalBg.appendChild(modal);
document.body.appendChild(modalBg);

loginBtn.addEventListener("click", () => {
	modalBg.style.display = "block";
});
closeModalBtn.addEventListener("click", () => {
	modalBg.style.display = "none";
	loginError.style.display = "none";
});

// login
doLoginBtn.addEventListener("click", () => {
	const pass = passInput.value;
	if (!pass) {
		loginError.textContent = "Fyll i lösenord.";
		loginError.style.display = "block";
		return;
	}
	const auth = getAuth(app);
	signInWithEmailAndPassword(auth, ADMIN_EMAIL, pass)
		.then(() => {
			loginError.style.display = "none";
			showPopup("Inloggning lyckades!");
			modalBg.style.display = "none";
			showAllMessages();
		})
		.catch(() => {
			loginError.textContent = "Fel lösenord.";
			loginError.style.display = "block";
		});
});

// modal with msgs
function showAllMessages() {
	const listModalBg = document.createElement("div");
	listModalBg.style.position = "fixed";
	listModalBg.style.top = 0;
	listModalBg.style.left = 0;
	listModalBg.style.width = "100vw";
	listModalBg.style.height = "100vh";
	listModalBg.style.background = "rgba(0,0,0,0.3)";
	listModalBg.style.zIndex = 3000;

	const listModal = document.createElement("div");
	listModal.style.position = "fixed";
	listModal.style.left = "50%";
	listModal.style.top = "50%";
	listModal.style.transform = "translate(-50%, -50%)";
	listModal.style.background = "white";
	listModal.style.padding = "32px 24px";
	listModal.style.borderRadius = "12px";
	listModal.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
	listModal.style.minWidth = "1000px";
	listModal.style.maxWidth = "1000px";
	listModal.style.maxHeight = "70vh";
	listModal.style.overflowY = "auto";

	const closeListBtn = document.createElement("button");
	closeListBtn.textContent = "Stäng";
	closeListBtn.style.marginTop = "16px";
	closeListBtn.style.background = "#dc3545";
	closeListBtn.style.color = "white";
	closeListBtn.style.border = "none";
	closeListBtn.style.borderRadius = "6px";
	closeListBtn.style.padding = "8px 16px";
	closeListBtn.style.cursor = "pointer";

	const title = document.createElement("h3");
	title.textContent = "Alla inlägg";
	title.style.marginBottom = "16px";
	listModal.appendChild(title);

	const ul = document.createElement("ul");
	ul.style.padding = 0;
	ul.style.listStyle = "none";
	ul.style.width = "100%";

	onValue(messagesRef, (snapshot) => {
		ul.innerHTML = "";
		snapshot.forEach(child => {
			const li = document.createElement("li");
			li.textContent = child.val().text;
			li.style.padding = "8px 0";
			li.style.borderBottom = "1px solid #eee";
			ul.appendChild(li);
		});
	}, { onlyOnce: true });

	listModal.appendChild(ul);
	listModal.appendChild(closeListBtn);
	listModalBg.appendChild(listModal);
	document.body.appendChild(listModalBg);
	closeListBtn.addEventListener("click", () => {
		document.body.removeChild(listModalBg);
	});
}





const root = document.getElementById("root");
const formContainer = document.createElement("div");
formContainer.className = "form-container";

// headline
const heading = document.createElement("h2");
heading.textContent = "Anonym Feedback";
heading.style.marginBottom = "32px";
formContainer.appendChild(heading);

// Textarea
const textarea = document.createElement("textarea");
textarea.className = "form-input";
textarea.placeholder = "Skriv ditt meddelande här...";
formContainer.appendChild(textarea);

// password field and btn
const row = document.createElement("div");
row.style.display = "flex";
row.style.width = "100%";
row.style.gap = "16px";
row.style.marginTop = "16px";

const passwordInput = document.createElement("input");
passwordInput.type = "text";
passwordInput.placeholder = "Lösenord";
passwordInput.style.flex = "1";
passwordInput.style.padding = "12px";
passwordInput.style.borderRadius = "8px";
passwordInput.style.border = "1px solid #ccc";
passwordInput.style.fontSize = "1.1rem";

const btn = document.createElement("button");
btn.className = "form-btn";
btn.textContent = "Skicka";
btn.style.flex = "0 0 120px";

row.appendChild(passwordInput);
row.appendChild(btn);
formContainer.appendChild(row);
root.appendChild(formContainer);

// Import Firebase
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { app } from "./firebaseinit.js";

const db = getDatabase(app);
const messagesRef = ref(db, "messages");

//send data
let canSend = true;
let timerId = null;

btn.addEventListener("click", () => {
	if (!canSend) {
		showPopup("Vänta 1 minut innan du skickar igen.", true);
		return;
	}
	if (textarea.value.trim() === "") {
		showPopup("Du måste skriva ett meddelande.", true);
		return;
	}
	const password = passwordInput.value;
	if (!password) {
		showPopup("Du måste ange lösenord.", true);
		return;
	}
	const auth = getAuth(app);
	signInWithEmailAndPassword(auth, EMAIL, password)
		.then(() => {
			push(messagesRef, { text: textarea.value })
				.then(() => {
					textarea.value = "";
					passwordInput.value = "";
					showPopup("Meddelandet skickades!");
					canSend = false;
					btn.disabled = true;
					let seconds = 60;
					btn.textContent = `Vänta (${seconds})`;
					timerId = setInterval(() => {
						seconds--;
						btn.textContent = `Vänta (${seconds})`;
						if (seconds <= 0) {
							clearInterval(timerId);
							btn.disabled = false;
							btn.textContent = "Skicka";
							canSend = true;
						}
					}, 1000);
				})
				.catch(() => {
					showPopup("Fel: Kunde inte skicka meddelandet.", true);
				});
		})
		.catch(() => {
			showPopup("Fel lösenord!", true);
		});
});

function showPopup(message, isError = false) {
	const popup = document.createElement("div");
	popup.textContent = message;
	popup.style.position = "fixed";
	popup.style.top = "30px";
	popup.style.left = "50%";
	popup.style.transform = "translateX(-50%)";
	popup.style.background = isError ? "#dc3545" : "#28a745";
	popup.style.color = "white";
	popup.style.padding = "12px 24px";
	popup.style.borderRadius = "8px";
	popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
	popup.style.zIndex = 1000;
	document.body.appendChild(popup);
	setTimeout(() => {
		popup.remove();
	}, 2000);
}