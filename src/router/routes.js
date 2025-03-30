import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import NotFound from "../views/NotFound.vue";
import Search from "../views/Search.vue";
import Publications from "../views/Publications/Publications.vue";
import Publication from "../views/Publications/Publication.vue";
import Issue from "../views/Issues/Issue.vue";
import Article from "../views/Articles/Article.vue";
import ArticlesLatest from "../views/Articles/ArticlesLatest.vue";
import Author from "../views/Author/Author.vue";
import Keyword from "../views/Keyword/Keyword.vue";

// User Views
import UserProfile from "../views/User/UserProfile.vue";
import UserPageLayout from "../views/User/UserPageLayout.vue";
import UserLibrary from "../views/User/UserLibrary.vue";
import UserEditProfile from "../views/User/UserEditProfile.vue";
import UserNotifications from "../views/User/UserNotifications.vue";
import UserSettingsLayout from "../views/User/Settings/UserSettingsLayout.vue";
import UserSettingsAccount from "../views/User/Settings/UserSettingsAccount.vue";
import UserSettingsPassword from "../views/User/Settings/UserSettingsPassword.vue";
import UserSettingsEmail from "../views/User/Settings/UserSettingsEmail.vue";
import UserSettingsNotifications from "../views/User/Settings/UserSettingsNotifications.vue";

// Admin Views
import AdminLayout from "../views/Admin/AdminLayout.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import AdminUsers from "../views/Admin/AdminUsers.vue";
import AdminUser from "../views/Admin/AdminUser.vue";
import Admin from "../views/Admin/Admin.vue";
import AdminPublishers from "../views/Admin/AdminPublishers.vue";
import AdminPublications from "../views/Admin/AdminPublications.vue";
import AdminPublication from "../views/Admin/AdminPublication.vue";
import AdminArticles from "../views/Admin/AdminArticles.vue";
import AdminArticle from "../views/Admin/AdminArticle.vue";
import AdminPublisher from "../views/Admin/AdminPublisher.vue";
import AdminAuthors from "../views/Admin/AdminAuthors.vue";
import AdminAuthor from "../views/Admin/AdminAuthor.vue";
import AdminKeywords from "../views/Admin/AdminKeywords.vue";
import AdminCreateObject from "../views/Admin/AdminCreateObject.vue";

const routes = [
   {
      path: "/",
      name: "Home",
      component: Home,
      meta: { title: "Repository of Research Works" },
   },
   {
      path: "/user",
      name: "User Page",
      redirect: "/user/profile",
      component: UserPageLayout,
      meta: { title: "User", auth: true , admin: false},
      children: [
         { path: "profile", name: "User Profile", component: UserProfile, meta: { title: "User Profile", auth: true , admin: false } },
         { path: "library", name: "User Library", component: UserLibrary, meta: { title: "My Library", auth: true , admin: false } },
         { path: "notifications", name: "User Notifications", component: UserNotifications, meta: { title: "User Notifications", auth: true , admin: false } },
         { path: "edit-profile", name: "User Edit Profile", component: UserEditProfile, meta: { title: "Edit User Profile", auth: true , admin: false } },
         { 
            path: "settings", 
            name: "User Settings", 
            redirect: "/user/settings/account",
            component: UserSettingsLayout, 
            meta: { title: "User Settings", auth: true , admin: false },
            children: [
               { path: "account", name: "User Settings Account", component: UserSettingsAccount, meta: { title: "Account Settings", auth: true , admin: false } },
               { path: "password", name: "User Settings Password", component: UserSettingsPassword, meta: { title: "Password Settings", auth: true , admin: false } },
               { path: "email", name: "User Settings Email", component: UserSettingsEmail, meta: { title: "Email Settings", auth: true , admin: false } },
               { path: "notifications", name: "User Settings Notifications", component: UserSettingsNotifications, meta: { title: "Notification Settings", auth: true , admin: false } },
            ]
         },
      ]
   },
   {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { title: "Login User", guest: true },
   },
   {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { title: "Register User", guest: true },
   },
   {
      path: "/admin",
      name: "Admin Dashboard",
      redirect: "/admin/dashboard",
      component: AdminLayout,
      meta: { title: "Admin Dashboard", auth: true , admin: true},
      children: [
         { path: "account", name: "Admin", component: Admin, meta: { title: "Admin", auth: true , admin: true } },
         { path: "dashboard", name: "AdminDashboard", component: AdminDashboard, meta: { title: "Dashboard", auth: true , admin: true } },
         { path: "users", name: "AdminUsers", component: AdminUsers, meta: { title: "Users", auth: true, admin: true}, },
         { path: "users/:id", name: "AdminUser", component: AdminUser, meta: { title: "User", auth: true, admin: true }},
         { path: "publishers", name: "AdminPublishers", component: AdminPublishers, meta: { title: "Publishers", auth: true, admin: true}, },
         { path: "publishers/:id", name: "AdminPublisher", component: AdminPublisher, meta: { title: "Publisher", auth: true, admin: true}, },
         { path: "publications", name: "AdminPublications", component: AdminPublications, meta: { title: "Publications", auth: true, admin: true}},
         { path: "publications/:id", name: "AdminPublication", component: AdminPublication, meta: { title: "Publication", auth: true, admin: true}, },
         { path: "articles", name: "AdminArticles", component: AdminArticles, meta: { title: "Articles", auth: true, admin: true}},
         { path: "articles/:id", name: "AdminArticle", component: AdminArticle, meta: { title: "Article", auth: true, admin: true}, },
         { path: "authors", name: "AdminAuthors", component: AdminAuthors, meta: { title: "Authors", auth: true, admin: true} },
         { path: "authors/:id", name: "AdminAuthor", component: AdminAuthor, meta: { title: "Author", auth: true, admin: true}, },
         { path: "keywords", name: "AdminKeywords", component: AdminKeywords, meta: { title: "Keywords", auth: true, admin: true} },
         { path: ":type/create", name: "AdminCreateObject", component: AdminCreateObject, meta: { title: "Create", auth: true, admin: true } },
      ]
   },
   {
      path: "/publications", 
      name: "Publications",
      component: Publications,
      meta: { title: "Publications" }
   },
   {
      path: "/publication/:id",
      name: "Publication",
      component: Publication,
      meta: { title: "Publication" }
   },
   {
      path: "/publication/:publicationId/:volumeNumber/:issueName",
      name: "Issue",
      component: Issue,
      meta: { title: "Issue" }
   },
   {
      path: "/publication/:publicationId/:volumeNumber/:issueName/:articleId",
      name: "Article",
      component: Article,
      meta: { title: "Article" }
   },
   {
      path: "/latest-articles",
      name: "ArticlesLatest",
      component: ArticlesLatest,
      meta: { title: "Latest Articles" },
   },
   {
      path: "/search",
      name: "Search",
      component: Search,
      props: route => ({ query: route.query.query }),
      meta: { title: "Search Results" }
   },
   {
      path: "/author/:id",
      name: "Author",
      component: Author,
      meta: { title: "Author" },
   },
   {
      path: "/keyword/:name",
      name: "Keyword",
      component: Keyword,
      meta: { title: "Keyword" },
   },
   {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
      meta: { title: "404 - Not Found" },
   },
];

export default routes;