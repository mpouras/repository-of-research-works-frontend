import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useToastStore } from "../stores/toasts";

const router = createRouter({
   history: createWebHistory("/"),
   routes,
});

function scrollToTopOnPush() {
   window.scrollTo(0, 0);
}

async function checkAuthAndRedirect(to, from) {
   const userStore = useUserStore();
   await userStore.getUser();

   const user = userStore.loggedIn;
   const role = userStore.role;

   if (user && to.meta.guest) return { name: "Home" };
   if (!user && to.meta.auth) return { name: "Login" };
   if (to.meta.admin === true && role !== "admin") return { name: "Home" };
   if (to.meta.admin === false && role !== "user") return { name: "Home" };

   return true;
}


router.beforeEach(async (to, from, next) => {
   scrollToTopOnPush();
   
   const result = await checkAuthAndRedirect(to, from);
   
   if (result === true) {
      next();
   } else {
      next(result);
   }
});

function showToast() {
   useToastStore().showToast();
}

router.afterEach((to, from) => {
   showToast();
});

export default router;
