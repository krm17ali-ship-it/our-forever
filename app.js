const SUPABASE_URL = "https://rxyongbssvpqwijycrxl.supabase.co";
const SUPABASE_KEY = "sb_publishable_HeV2SjcdkjAwVquKcABC5w_FnOwF1SR";
const supabaseClient = window.supabase.createClient( SUPABASE_URL, SUPABASE_KEY );
document.addEventListener("DOMContentLoaded", function () {
const loginBtn = document.getElementById("loginBtn");

// لو إحنا مش في صفحة تسجيل الدخول، مفيش حاجة نعملها
if (!loginBtn) {
    return;
}

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

async function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "اكتب البريد الإلكتروني وكلمة المرور ❤️";
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "جاري الدخول...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {

        console.error("LOGIN ERROR:", error);

        message.textContent =
            "الإيميل أو كلمة المرور غير صحيحة ❌";

        loginBtn.disabled = false;
        loginBtn.textContent = "دخول 🔐";

        return;
    }

    message.textContent = "تم تسجيل الدخول بنجاح ❤️";

    window.location.href = "home.html";
}

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        login();
    }

});
});