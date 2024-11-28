<template>
  <div>
    <!-- NavBar Component -->
    <NavBar :name="userName" />

    <!-- Tombol untuk membuka modal -->
    <button type="button" class="btn btn-primary" @click="addModal = true">Add Master Data</button>
    <!-- Modal -->
    <div v-if="addModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5)">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #3dcd58">
            <h5 class="text-white"><i class="fa fa-info-circle mr-2"></i>Add Master Data</h5>
            <button type="button" class="close" @click="addModal = false" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form-group mb-3">
                <label for="plant" class="form-label-bold">Plant</label>
                <input type="text" v-model="plant" class="form-control" id="plant" placeholder="Enter Data" required />
              </div>
              <!-- Submit Button -->
              <button @click="create" class="btn btn-success btn-block form-control">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabel untuk menampilkan data -->
  <div class="container mt-4">
    <h4>Plant Master Data List</h4>
    <table class="table table-bordered table-sm mt-3">
      <thead>
        <tr>
          <th>Plant</th>
          <th>Modify by</th>
          <th>Last Update</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import router from "@/router";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      addModal: false,
      userName: localStorage.getItem("name") || "Guest",
      plant: "",
    };
  },
  methods: {
    create() {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      if (!token) {
        console.error("Token not found!");
        return;
      }
      console.log("Token yang diambil:", token);
      // Menampilkan data di console sebelum dikirim
      console.log("Data form yang akan dikirim:", {
        plant: this.plant,
      });
      axios
        .post(
          "http://localhost/TestingProduct/public/api/plant",
          {
            plant: this.plant,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Pastikan token ada di localStorage
            },
          }
        )
        .then(function (response) {
          // Save user data to localStorage
          localStorage.setItem("plant", response.data.data.plant);
          localStorage.setItem("token", token); // Save the token

          // Log token to the console for debugging
          console.log("Token dikirim di header:", token);
          /* router.push({ name: "home" }); */
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
/* Tambahkan gaya sesuai kebutuhan Anda */
.modal.fade.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}
div {
  margin-bottom: 1rem;
}
label {
  margin-bottom: 0.5rem;
}
input,
textarea,
button {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
