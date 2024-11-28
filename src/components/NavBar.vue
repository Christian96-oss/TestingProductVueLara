<template lang="">
  <header v-if="$route.name != 'login'">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dt">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
              <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
            </li>
            <li class="nav-item me-3">
              <RouterLink to="/testplan" class="nav-link">Test Planning</RouterLink>
            </li>
            <li class="nav-item me-3">
              <RouterLink to="/pendingapproval" class="nav-link">Pending Approval</RouterLink>
            </li>
            <li class="nav-item me-3">
              <RouterLink to="/teststart" class="nav-link">Test Start</RouterLink>
            </li>
            <li class="nav-item me-3">
              <RouterLink to="/history" class="nav-link">History</RouterLink>
            </li>
            <!-- Dropdown with toggle -->
            <li class="nav-item dropdown me-3" :class="{ show: isDropdownVisible }">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" @click="toggleDropdown" :aria-expanded="isDropdownVisible.toString()">Master Data</a>
              <ul class="dropdown-menu" v-show="isDropdownVisible" aria-labelledby="navbarDropdown">
                <li><RouterLink to="/familydata" class="dropdown-item">Family Master Data</RouterLink></li>
                <li><RouterLink to="/lobdata" class="dropdown-item">LoB Master Data</RouterLink></li>
                <li><RouterLink to="/referencedata" class="dropdown-item">Reference Master Data</RouterLink></li>
                <li><RouterLink to="/testnamedata" class="dropdown-item">Test Name Master Data</RouterLink></li>
                <li><RouterLink to="/appsdata" class="dropdown-item">Apps Master Data</RouterLink></li>
                <li><RouterLink to="/plantdata" class="dropdown-item">Plant Master Data</RouterLink></li>
                <li><RouterLink to="/deptdata" class="dropdown-item">Dept Master Data</RouterLink></li>
              </ul>
            </li>
            <li class="nav-item me-3">
              <a href="#" @click="logout()" class="nav-link">Logout</a>
            </li>
          </ul>
          <li class="d-flex">
            <span>Hi, {{ name }}</span>
          </li>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  props: ["name"],
  data() {
    return {
      isDropdownVisible: false, // Initialize dropdown visibility as false
    };
  },
  methods: {
    logout() {
      axios
        .get("http://localhost/TestingProduct/public/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          // Remove items from localStorage upon logout
          localStorage.removeItem("user_id");
          localStorage.removeItem("name");
          localStorage.removeItem("access");
          localStorage.removeItem("email");
          localStorage.removeItem("plant");
          localStorage.removeItem("apps");
          localStorage.removeItem("dept");
          localStorage.removeItem("qa");
          localStorage.removeItem("token");
          router.push({ name: "login" });
        })
        .catch(function (error) {
          console.log(error);
          console.log("ini error");
        });
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible; // Toggle dropdown visibility
    },
  },
};
</script>

<style>
/* Styling untuk navbar links */
.navbar-dark .navbar-nav .nav-link {
  text-decoration: none !important; /* Menghapus garis bawah */
  color: white !important; /* Warna teks putih */
  font-weight: bold !important; /* Menjadikan teks tebal */
  font-size: 14px !important;
}

/* Styling untuk dropdown menu item */
.navbar-dark .dropdown-menu {
  background-color: #3dcd58 !important; /* Menyesuaikan dengan background navbar */
  border-radius: 5px; /* Memberikan radius pada sudut dropdown */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Menambahkan shadow untuk efek */
}

/* Styling untuk dropdown item */
.navbar-dark .dropdown-menu .dropdown-item {
  font-size: 14px !important;
  color: white !important; /* Warna teks putih */
  font-weight: bold !important;
  text-decoration: none !important; /* Menghapus garis bawah */
  padding: 10px 20px; /* Menambahkan padding agar item lebih mudah dibaca */
}

/* Hover effect untuk dropdown item */
.navbar-dark .dropdown-menu .dropdown-item:hover {
  background-color: #d4e41c !important; /* Warna latar belakang saat hover */
  color: black !important; /* Warna teks saat hover */
}

/* Dropdown menu tampil setelah diklik */
.navbar-dark .navbar-nav .nav-item.dropdown .dropdown-menu {
  display: none; /* Menyembunyikan dropdown secara default */
  position: absolute; /* Posisi dropdown tepat di bawah item */
  top: 100%; /* Membuat dropdown muncul tepat di bawah navbar item */
  left: 0; /* Menyesuaikan dengan posisi navbar item */
  min-width: 200px; /* Membuat lebar dropdown tetap sama */
  z-index: 1000; /* Memastikan dropdown berada di atas konten lainnya */
}

/* Menampilkan dropdown saat diklik pada navbar item */
.navbar-dark .navbar-nav .nav-item.dropdown.show .dropdown-menu {
  display: block !important; /* Menampilkan dropdown saat dropdown-toggle di-click */
}

/* Hover effect pada navbar links */
.navbar-dark .navbar-nav .nav-link:hover {
  color: #d4e41c !important; /* Mengubah warna teks saat hover */
}

/* Hover effect pada link logout */
.navbar-dark .navbar-nav a:hover {
  color: #d4e41c !important; /* Mengubah warna saat hover */
}

/* Styling background untuk navbar */
.bg-dt {
  background-color: #3dcd58 !important;
  color: #fff !important;
}
</style>
