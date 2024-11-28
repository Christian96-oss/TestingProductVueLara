<template lang="">
  <div :style="backgroundStyle">
    <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh">
      <div class="col-lg-4 mx-5 py-4 px-5 text-dark rounded border border-dark" style="background-color: rgba(180, 190, 196, 0.6)">
        <h3 class="text-center">Testing Product</h3>
        <form @submit.prevent>
          <div class="form-group mb-3">
            <label for="user_id" class="form-label-bold">User ID</label>
            <input type="text" v-model="user_id" class="form-control" id="user_id" placeholder="enter user id" required />
          </div>
          <div class="form-group mb-3">
            <label for="password" class="form-label-bold">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="enter password" required />
          </div>
          <button @click="login" class="btn btn-success btn-block form-control">Login</button>
        </form>
      </div>
    </div>
  </div>

  <footer style="position: absolute; bottom: 0; width: 100%; text-align: center">
    <div style="background-color: transparent" class="container-fluid mt-5">
      <div class="row justify-content-center">
        <div class="col-lg text-center text-white pt-4 pb-2">
          <strong>Copyright &copy; {{ currentYear }} <a href="#" class="no-underline">EA Central Digital Transformation - GSC EAJ Cluster Schneider Electric</a>. </strong> All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      user_id: "",
      password: "",
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    // Computed property to set the background dynamically
    backgroundStyle() {
      // Check if the current route is 'login', if so apply the background
      if (this.$route.name === "login") {
        return {
          backgroundImage: "url(/city.png)", // Set the background image for login
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh", // Ensure full viewport height
        };
      }
      return {}; // If it's not the login route, return an empty object (no background)
    },
  },
  mounted() {
    // If the user is already logged in, redirect to the home page
    const token = localStorage.getItem("token");
    if (token) {
      router.push({ name: "home" });
    }
  },
  methods: {
    login() {
      axios
        .post("http://localhost/TestingProduct/public/api/auth/login", {
          user_id: this.user_id,
          password: this.password,
        })
        .then(function (response) {
          const token = response.data.data.token;
          // Save user data to localStorage
          localStorage.setItem("user_id", response.data.data.user_id);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("access", response.data.data.access);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("plant", response.data.data.plant);
          localStorage.setItem("apps", response.data.data.apps);
          localStorage.setItem("dept", response.data.data.dept);
          localStorage.setItem("qa", response.data.data.qa);
          localStorage.setItem("token", token); // Save the token

          // Log token to the console for debugging
          console.log("Token dikirim di header:", token);
          // Redirect to home page after login
          router.push({ name: "home" });
        })
        .catch(function (error) {
          console.log(error);
          console.log("Login error");
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}

.no-underline {
  text-decoration: none; /* Remove underline on link */
}

.form-label-bold {
  font-weight: bold;
}
</style>
