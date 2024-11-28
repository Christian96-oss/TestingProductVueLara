import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import TestplanView from "../views/TestplanView.vue";
import PendingApprovalView from "../views/PendingApprovalView.vue";
import TestStartView from "../views/TestStartView.vue";
import HistoryView from "../views/HistoryView.vue";
import MasterDataView from "../views/MasterDataView.vue";
import AppsMasterData from "../views/AppsMasterData.vue";
import FamilyMasterData from "../views/FamilyMasterData.vue";
import LobMasterData from "../views/LobMasterData.vue";
import TestnameMasterData from "../views/TestnameMasterData.vue";
import ReferenceMasterData from "../views/ReferenceMasterData.vue";
import PlantMasterData from "../views/PlantMasterData.vue";
import DeptMasterData from "../views/DeptMasterData.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/testplan",
      name: "testplan",
      component: TestplanView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/pendingapproval",
      name: "pendingapproval",
      component: PendingApprovalView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/teststart",
      name: "teststart",
      component: TestStartView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/history",
      name: "history",
      component: HistoryView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/masterdate",
      name: "masterdata",
      component: MasterDataView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/familydata",
      name: "familydata",
      component: FamilyMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/lobdata",
      name: "lobdata",
      component: LobMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/referencedata",
      name: "referencedata",
      component: ReferenceMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/testnamedata",
      name: "testnamedata",
      component: TestnameMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/appsdata",
      name: "appsdata",
      component: AppsMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/plantdata",
      name: "plantdata",
      component: PlantMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/deptdata",
      name: "deptdata",
      component: DeptMasterData,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    // Penanganan untuk rute tidak ditemukan (optional)
    {
      path: "/:catchAll(.*)",
      redirect: "/login", // Redirect ke login jika rute tidak ada
    },
  ],
});

// Navigation guard untuk memeriksa autentikasi
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Periksa apakah token ada di localStorage
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      console.log("Redirecting to login");
      next({ name: "login" }); // Arahkan ke halaman login jika belum login
    } else {
      next(); // Lanjutkan jika sudah login
    }
  } else {
    next(); // Lanjutkan jika rute tidak membutuhkan autentikasi
  }
});

export default router;
