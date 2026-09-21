console.log("✅ Custom ThemeSwitcher loaded (frappe_theme_switcher)");

frappe.provide("frappe.ui");

frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
    constructor() {
        super();
    }

    fetch_themes() {
        return new Promise((resolve) => {
            this.themes = [
                { name: "light", label: "Frappe Light", info: "Light Theme" },
                { name: "dark", label: "Timeless Night", info: "Dark Theme" },
                { name: "automatic", label: "Automatic", info: "Uses system's theme" },
                { name: "cotton_candy", label: "Cotton Candy", info: "Cotton Candy Blue Theme" },
                { name: "cherry", label: "Cherry", info: "Cherry Theme" },
                { name: "apricot", label: "Apricot", info: "Apricot Theme" },
                { name: "watermelon", label: "Watermelon", info: "Watermelon Theme" }
            ];
            resolve(this.themes);
        });
    }
};


// /* ============================
//    Custom Navbar Button
//    ============================ */
// document.addEventListener("DOMContentLoaded", function () {
//     const observer = new MutationObserver(() => {
//         const navbar = document.querySelector(".collapse.navbar-collapse .navbar-nav");
//         const notifications = navbar?.querySelector(".dropdown-notifications");

//         if (navbar && notifications && !navbar.querySelector(".custom-nav-btn")) {
//             let li = document.createElement("li");
//             li.className = "nav-item";

//             let button = document.createElement("button");
//             button.className = "btn btn-primary nav-link custom-nav-btn";
//             button.innerText = "My Action";

//             button.addEventListener("click", () => {
//                 frappe.msgprint("✅ Custom Navbar Button Clicked!");
//                 // مثال: تفتح صفحة
//                 // frappe.set_route("List", "Sales Invoice");
//             });

//             li.appendChild(button);
//             navbar.insertBefore(li, notifications);

//             observer.disconnect(); // وقف المراقبة بعد ما الزرار اتضاف
//         }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// });
/* ============================
   Custom Navbar Language Switch
   ============================ */
// document.addEventListener("DOMContentLoaded", function() {
//     const observer = new MutationObserver(() => {
//         const navbar = document.querySelector(".collapse.navbar-collapse .navbar-nav");
//         const notifications = navbar ? .querySelector(".dropdown-notifications");

//         if (navbar && notifications && !navbar.querySelector(".lang-toggle-btn")) {
//             let li = document.createElement("li");
//             li.className = "nav-item";

//             let button = document.createElement("button");
//             button.className = "btn btn-primary nav-link lang-toggle-btn";
//             button.innerText = frappe.boot.user.language === "ar" ? "English" : "العربية";

//             button.addEventListener("click", () => {
//                 let new_lang = frappe.boot.user.language === "ar" ? "en" : "ar";

//                 frappe.call({
//                     method: "frappe.client.set_value",
//                     args: {
//                         doctype: "User",
//                         name: frappe.session.user,
//                         fieldname: "language",
//                         value: new_lang
//                     },
//                     callback: () => {
//                         frappe.show_alert({ message: __("Language changed! Reloading..."), indicator: "green" });
//                         location.reload();
//                     }
//                 });
//             });

//             li.appendChild(button);
//             navbar.insertBefore(li, notifications);

//             observer.disconnect(); // وقف المراقبة بعد ما الزرار اتضاف
//         }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// // });


// // custom_lang_toggle.js
// (function() {
//     function getCurrentLang() {
//         try {
//             return (window.frappe && frappe.boot && frappe.boot.user && frappe.boot.user.language) || 'en';
//         } catch (e) {
//             return 'en';
//         }
//     }

//     function makeButton() {
//         var btn = document.createElement('button');
//         btn.type = 'button';
//         btn.className = 'btn btn-primary btn-sm nav-link lang-toggle-btn';
//         btn.textContent = (getCurrentLang() === 'ar') ? 'English' : 'العربية';

//         btn.addEventListener('click', function() {
//             var current = getCurrentLang();
//             var newLang = current === 'ar' ? 'en' : 'ar';

//             frappe.call({
//                 method: 'frappe.client.set_value',
//                 args: { doctype: 'User', name: frappe.session.user, fieldname: 'language', value: newLang },
//                 callback: function() {
//                     frappe.show_alert({ message: __('Language changed! Reloading...'), indicator: 'green' });
//                     window.location.reload();
//                 },
//                 error: function() {
//                     // Session-only fallback (add the whitelisted server method if needed)
//                     frappe.call({
//                         method: 'your_app.api.set_session_language',
//                         args: { lang: newLang },
//                         callback: function() { window.location.reload(); }
//                     });
//                 }
//             });
//         });

//         return btn;
//     }

//     function placeButton() {
//         // Avoid duplicates
//         if (document.querySelector('.lang-toggle-btn')) return;

//         var navbar = document.querySelector('.navbar');
//         if (!navbar) return;

//         var notificationsLi = null;
//         var notifAnchor = navbar.querySelector('.dropdown-notifications');
//         if (notifAnchor && notifAnchor.closest) notificationsLi = notifAnchor.closest('li');

//         var ul = notificationsLi ? notificationsLi.parentElement : navbar.querySelector('.navbar-nav');

//         // Try to find the search bar in various layouts
//         var searchEl =
//             navbar.querySelector('#navbar-search') ||
//             navbar.querySelector('.search-bar') ||
//             navbar.querySelector('form.navbar-form') ||
//             navbar.querySelector('input[type="search"]');

//         var btn = makeButton();

//         // Strategy 1: if search is NOT inside the UL, insert before the search container in the navbar
//         if (searchEl && ul && !ul.contains(searchEl) && searchEl.parentNode) {
//             var wrap = document.createElement('div');
//             wrap.className = 'lang-toggle-wrapper';
//             wrap.appendChild(btn);
//             searchEl.parentNode.insertBefore(wrap, searchEl);
//             return;
//         }

//         // Strategy 2: insert as an <li> right after notifications within the UL
//         if (ul) {
//             var li = document.createElement('li');
//             li.className = 'nav-item lang-toggle-item';
//             li.appendChild(btn);

//             if (notificationsLi && notificationsLi.nextSibling) {
//                 ul.insertBefore(li, notificationsLi.nextSibling);
//             } else {
//                 ul.appendChild(li);
//             }
//         }
//     }

//     function start() {
//         placeButton(); // initial
//         // keep it stable across route changes
//         var obs = new MutationObserver(placeButton);
//         obs.observe(document.body, { childList: true, subtree: true });
//     }

//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', start);
//     } else {
//         start();
//     }
// })();


// // custom_lang_toggle.js
// (function() {
//     function getCurrentLang() {
//         try {
//             return (window.frappe && frappe.boot && frappe.boot.user && frappe.boot.user.language) || 'en';
//         } catch { return 'en'; }
//     }

//     function makeButton() {
//         var btn = document.createElement('button');
//         btn.type = 'button';
//         btn.className = 'btn btn-primary btn-sm lang-toggle-btn';
//         btn.textContent = (getCurrentLang() === 'ar') ? 'English' : 'العربية';

//         btn.addEventListener('click', function() {
//             var current = getCurrentLang();
//             var newLang = current === 'ar' ? 'en' : 'ar';

//             frappe.call({
//                 method: 'frappe.client.set_value',
//                 args: { doctype: 'User', name: frappe.session.user, fieldname: 'language', value: newLang },
//                 callback: function() {
//                     frappe.show_alert({ message: __('Language changed! Reloading...'), indicator: 'green' });
//                     window.location.reload();
//                 },
//                 error: function() {
//                     frappe.call({
//                         method: 'your_app.api.set_session_language',
//                         args: { lang: newLang },
//                         callback: function() { window.location.reload(); }
//                     });
//                 }
//             });
//         });
//         return btn;
//     }

//     function placeButton() {
//         if (document.querySelector('.lang-toggle-btn')) return;

//         var navbar = document.querySelector('.navbar');
//         if (!navbar) return;

//         var notifAnchor = navbar.querySelector('.dropdown-notifications');
//         var notificationsLi = notifAnchor && notifAnchor.closest ? notifAnchor.closest('li') : null;
//         var ul = notificationsLi ? notificationsLi.parentElement : navbar.querySelector('.navbar-nav');

//         // find search in common layouts
//         var searchEl =
//             navbar.querySelector('#navbar-search') ||
//             navbar.querySelector('.search-bar') ||
//             navbar.querySelector('form.navbar-form') ||
//             navbar.querySelector('input[type="search"]');

//         var btn = makeButton();

//         li.appendChild(btn);
//             navbar.insertBefore(li, notifications);


//         // // Prefer: put AFTER search (so it's between search and notifications)
//         // if (searchEl && searchEl.parentNode) {
//         //     var wrap = document.createElement('div');
//         //     wrap.className = 'lang-toggle-wrapper';
//         //     wrap.appendChild(btn);
//         //     // insert after search
//         //     if (searchEl.nextSibling) {
//         //         searchEl.parentNode.insertBefore(wrap, searchEl.nextSibling);
//         //     } else {
//         //         searchEl.parentNode.appendChild(wrap);
//         //     }
//         //     return;
//         // }

//         // // Fallback: as <li> right before notifications within the UL
//         // if (ul) {
//         //     var li = document.createElement('li');
//         //     li.className = 'nav-item lang-toggle-item';
//         //     li.appendChild(btn);
//         //     if (notificationsLi) {
//         //         ul.insertBefore(li, notificationsLi);
//         //     } else {
//         //         ul.appendChild(li);
//         //     }
//         // }
//     }

//     function start() {
//         placeButton();
//         var obs = new MutationObserver(placeButton);
//         obs.observe(document.body, { childList: true, subtree: true });
//     }

//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', start);
//     } else {
//         start();
//     }
// })();

/* ============================
   Navbar Language Toggle (keeps your placement)
   ============================ */
document.addEventListener("DOMContentLoaded", function() {
    function placeBtn() {
        var navbar = document.querySelector(".collapse.navbar-collapse .navbar-nav");
        if (!navbar) return;

        var notifications = navbar.querySelector(".dropdown-notifications");
        if (!notifications) return;

        if (navbar.querySelector(".lang-toggle-btn")) return; // avoid duplicates

        var li = document.createElement("li");
        li.className = "nav-item";

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-primary nav-link lang-toggle-btn";

        var current = (window.frappe && frappe.boot && frappe.boot.user && frappe.boot.user.language) || "en";
        btn.textContent = current === "ar" ? "English" : "العربية";

        btn.addEventListener("click", function() {
            var cur = (window.frappe && frappe.boot && frappe.boot.user && frappe.boot.user.language) || "en";
            var new_lang = cur === "ar" ? "en" : "ar";

            frappe.call({
                method: "frappe.client.set_value",
                args: { doctype: "User", name: frappe.session.user, fieldname: "language", value: new_lang },
                callback: function() {
                    frappe.show_alert({ message: __("Language changed! Reloading..."), indicator: "green" });
                    location.reload();
                },
                error: function() {
                    // Session-only fallback if user can't write User.language:
                    frappe.call({
                        method: "your_app.api.set_session_language",
                        args: { lang: new_lang },
                        callback: function() { location.reload(); }
                    });
                }
            });
        });

        li.appendChild(btn);

        var notifLi = notifications.closest ? notifications.closest("li") : null;
        if (notifLi && notifLi.parentNode) {
            notifLi.parentNode.insertBefore(li, notifLi); // just before notifications (your original placement)
        } else {
            navbar.appendChild(li);
        }
    }

    placeBtn();
    new MutationObserver(placeBtn).observe(document.body, { childList: true, subtree: true });
});