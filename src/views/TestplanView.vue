<template>
  <!-- NavBar Component -->
  <NavBar :name="userName" />

  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-2 mb-2">
          <div class="card card-success">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3">
                <div class="d-flex">
                  <h2 class="text-dark"><i class="far fa-calendar-check"></i>&nbsp;Test Planning</h2>
                  <h2 class="text-dt">&nbsp;Detail</h2>
                </div>
                <button class="btn btn-success btn-sm ml-5" style="width: 15%; height: 2rem; margin-top: 0; padding: 0.3rem 0" @click="addModal = true"><i class="fa fa-plus"></i> Create Test Plan</button>
              </div>
              <div class="row">
                <div class="col-2 col-md-2 col-sm-6">
                  <label style="font-size: 10pt; font-weight: bold">Date From </label>
                  <input type="date" id="date_from" value="" class="form-control form-control-sm text-center" />
                </div>
                <div class="col-2 col-md-2 col-sm-6">
                  <label style="font-size: 10pt; font-weight: bold">Date To </label>
                  <input type="date" id="date_to" value="" class="form-control form-control-sm text-center" />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-6">
                  <div class="form-group">
                    <label style="font-size: 10pt; font-weight: bold">Family </label>
                    <select class="form-control form-control-sm text-center" id="select_family" style="width: 100%"></select>
                  </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-6">
                  <div class="form-group">
                    <label style="font-size: 10pt; font-weight: bold">Reference</label>
                    <select class="form-control form-control-sm text-center" id="select_reff" style="width: 100%"></select>
                  </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-6">
                  <div class="form-group">
                    <label style="font-size: 10pt; font-weight: bold">Test Plan ID</label>
                    <select class="form-control form-control-sm text-center" id="select_tp_id" style="width: 100%"></select>
                  </div>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-4">
                  <label style="font-size: 10pt"></label>
                  <div>
                    <button id="btn_apply" name="btn_apply" class="btn btn-success btn-sm btn-block mt-2"><i class="fa fa-search mr-1"></i></button>
                  </div>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-4">
                  <label style="font-size: 10pt"></label>
                  <div>
                    <button id="btn_reset" name="btn_reset" class="btn btn-sm btn-warning btn-block mt-2" onclick="window.location.reload()"><i class="fa fa-history mr-1"></i></button>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <table class="table table-sm table-striped border" rules="none" id="tbl_details_filter" style="font-size: 10pt">
                  <thead>
                    <tr>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Test Plan ID</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Requestor</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Family</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Reference</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Lob</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Test Name</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Qty</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Purpose</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Detail</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Plan Date</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="15%">Status</th>
                      <th class="font-calibri border-right align-middle text-center text-white" style="background-color: #3dcd58" width="10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(test, index) in testPlans" :key="index">
                      <td>{{ test.tp_id }}</td>
                      <td>{{ test.requestor }}</td>
                      <td>{{ test.family }}</td>
                      <td>{{ test.reference }}</td>
                      <td>{{ test.lob }}</td>
                      <td>{{ test.test_name }}</td>
                      <td>{{ test.qty }}</td>
                      <td>{{ test.purpose }}</td>
                      <td>{{ test.detail }}</td>
                      <td>{{ test.plan_date }}</td>
                      <td>{{ test.status }}</td>
                      <td>
                        <button type="button" class="btn btn-success mb-1 mt-1" @click="openEditModal(test)"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger mb-1 mt-1" @click="deleteTestPlan(test.id)"><i class="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Create Test Plan Modal -->
  <div v-if="addModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #3dcd58">
          <h5 class="text-white"><i class="fa fa-info-circle mr-2"></i> Create Test Plan</h5>
          <button type="button" class="close" @click="addModal = false" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div class="form-group mb-3">
              <label for="tp_id" class="form-label-bold">Test Plan ID</label>
              <input type="text" v-model="tp_id" class="form-control" id="tp_id" placeholder="Enter Test Plan ID" required />
            </div>

            <div class="form-group mb-3">
              <label for="requestor" class="form-label-bold">Requestor</label>
              <input type="text" v-model="requestor" class="form-control" id="requestor" placeholder="Enter Requestor" required />
            </div>

            <div class="form-group mb-3">
              <label for="test_name" class="form-label-bold">Test Name</label>
              <input type="text" v-model="test_name" class="form-control" id="test_name" placeholder="Enter Test Name" required />
            </div>

            <div class="form-group mb-3">
              <label for="lob" class="form-label-bold">LoB</label>
              <input type="text" v-model="lob" class="form-control" id="lob" placeholder="Enter LoB" required />
            </div>

            <div class="form-group mb-3">
              <label for="family" class="form-label-bold">Family</label>
              <input type="text" v-model="family" class="form-control" id="family" placeholder="Enter Family" required />
            </div>

            <div class="form-group mb-3">
              <label for="reference" class="form-label-bold">Reference</label>
              <input type="text" v-model="reference" class="form-control" id="reference" placeholder="Enter Reference" required />
            </div>

            <div class="form-group mb-3">
              <label for="qty" class="form-label-bold">Qty</label>
              <input type="number" v-model="qty" class="form-control" id="qty" placeholder="Enter Quantity" required />
            </div>

            <div class="form-group mb-3">
              <label for="purpose" class="form-label-bold">Purpose of Test</label>
              <input type="text" v-model="purpose" class="form-control" id="purpose" placeholder="Enter Purpose of Test" required />
            </div>

            <div class="form-group mb-3">
              <label for="plan_date" class="form-label-bold">Plan Start Date</label>
              <input type="date" v-model="plan_date" class="form-control" id="plan_date" required />
            </div>

            <div class="form-group mb-3">
              <label for="detail" class="form-label-bold">Additional Information</label>
              <textarea v-model="detail" class="form-control" id="detail" rows="3" placeholder="Enter Additional Information" required></textarea>
            </div>
            <!-- Submit Button -->
            <button @click="create" class="btn btn-success btn-block form-control">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Test Plan Modal -->
  <div v-if="editModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #3dcd58">
          <h5 class="text-white"><i class="fa fa-info-circle mr-2"></i> Edit Test Plan</h5>
          <button type="button" class="close" @click="editModal = false" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div class="form-group mb-3">
              <label for="tp_id" class="form-label-bold">Test Plan ID</label>
              <input type="text" v-model="tp_id" class="form-control" id="tp_id" placeholder="Enter Test Plan ID" required />
            </div>

            <div class="form-group mb-3">
              <label for="requestor" class="form-label-bold">Requestor</label>
              <input type="text" v-model="requestor" class="form-control" id="requestor" placeholder="Enter Requestor" required />
            </div>

            <div class="form-group mb-3">
              <label for="test_name" class="form-label-bold">Test Name</label>
              <input type="text" v-model="test_name" class="form-control" id="test_name" placeholder="Enter Test Name" required />
            </div>

            <div class="form-group mb-3">
              <label for="lob" class="form-label-bold">LoB</label>
              <input type="text" v-model="lob" class="form-control" id="lob" placeholder="Enter LoB" required />
            </div>

            <div class="form-group mb-3">
              <label for="family" class="form-label-bold">Family</label>
              <input type="text" v-model="family" class="form-control" id="family" placeholder="Enter Family" required />
            </div>

            <div class="form-group mb-3">
              <label for="reference" class="form-label-bold">Reference</label>
              <input type="text" v-model="reference" class="form-control" id="reference" placeholder="Enter Reference" required />
            </div>

            <div class="form-group mb-3">
              <label for="qty" class="form-label-bold">Qty</label>
              <input type="number" v-model="qty" class="form-control" id="qty" placeholder="Enter Quantity" required />
            </div>

            <div class="form-group mb-3">
              <label for="purpose" class="form-label-bold">Purpose of Test</label>
              <input type="text" v-model="purpose" class="form-control" id="purpose" placeholder="Enter Purpose of Test" required />
            </div>

            <div class="form-group mb-3">
              <label for="plan_date" class="form-label-bold">Plan Start Date</label>
              <input type="date" v-model="plan_date" class="form-control" id="plan_date" required />
            </div>

            <div class="form-group mb-3">
              <label for="detail" class="form-label-bold">Additional Information</label>
              <textarea v-model="detail" class="form-control" id="detail" rows="3" placeholder="Enter Additional Information" required></textarea>
            </div>
            <!-- Submit Button -->
            <button @click="edit" class="btn btn-success btn-block form-control">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      addModal: false, // Modal untuk menambah data
      editModal: false, // Modal untuk mengedit data
      userName: localStorage.getItem("name") || "Guest",
      tp_id: "", // ID untuk test plan
      requestor: "",
      test_name: "",
      lob: "",
      family: "",
      reference: "",
      qty: "",
      purpose: "",
      plan_date: "",
      detail: "",
      testPlans: [], // Data untuk menyimpan seluruh test plans
    };
  },
  mounted() {
    this.fetchTestPlans(); // Memanggil API untuk mengambil data saat komponen dipasang
  },
  methods: {
    // Fungsi untuk mengambil data test plan dari API
    fetchTestPlans() {
      axios
        .get("http://localhost/TestingProduct/public/api/testplan", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menggunakan token dari localStorage
          },
        })
        .then((response) => {
          this.testPlans = response.data.data; // Menyimpan data test plans dari API ke array testPlans
        })
        .catch((error) => {
          console.error("Error fetching test plans:", error);
        });
    },
    // Fungsi untuk membuka modal edit dan mengisi data yang dipilih
    openEditModal(test) {
      this.id = test.id; // ID yang sesuai dengan primary key di database
      console.log("Selected Test Plan ID for Edit:", this.id);
      this.tp_id = test.tp_id;
      this.requestor = test.requestor;
      this.test_name = test.test_name;
      this.lob = test.lob;
      this.family = test.family;
      this.reference = test.reference;
      this.qty = test.qty;
      this.purpose = test.purpose;
      this.plan_date = test.plan_date;
      this.detail = test.detail;
      this.editModal = true; // Menampilkan modal edit
    },
    // Fungsi untuk mengupdate data test plan
    edit() {
      Swal.fire({
        title: "Update?",
        text: "Are you sure you want to update this Test Planning?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes!",
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found!");
            return;
          }

          return axios
            .patch(
              `http://localhost/TestingProduct/public/api/testplan/${this.id}`,
              {
                tp_id: this.tp_id,
                requestor: this.requestor,
                test_name: this.test_name,
                lob: this.lob,
                family: this.family,
                reference: this.reference,
                qty: this.qty,
                purpose: this.purpose,
                plan_date: this.plan_date,
                detail: this.detail,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              const index = this.testPlans.findIndex((item) => item.id === this.id);
              if (index !== -1) {
                this.testPlans[index] = response.data.data;
              }
              this.editModal = false;
              Swal.fire("Updated!", "The test plan has been updated.", "success");
              this.fetchTestPlans();
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("Error!", "There was an issue updating the test plan.", "error");
            });
        },
      });
    },
    create() {
      Swal.fire({
        title: "Create?",
        text: "Are you sure you want to create this Test Planning?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes!",
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found!");
            return;
          }

          return axios
            .post(
              "http://localhost/TestingProduct/public/api/testplan",
              {
                tp_id: this.tp_id,
                requestor: this.requestor,
                test_name: this.test_name,
                lob: this.lob,
                family: this.family,
                reference: this.reference,
                qty: this.qty,
                purpose: this.purpose,
                plan_date: this.plan_date,
                detail: this.detail,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              this.testPlans.push(response.data.data);
              this.addModal = false;
              Swal.fire("Created!", "The test plan has been created.", "success");
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("Error!", "There was an issue creating the test plan.", "error");
            });
        },
      });
    },

    // Fungsi untuk menghapus test plan
    deleteTestPlan(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Test Plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#28a745",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found!");
            return;
          }

          return axios
            .delete(`http://localhost/TestingProduct/public/api/testplan/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              this.testPlans = this.testPlans.filter((test) => test.id !== id);
              Swal.fire("Deleted!", "The test plan has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting test plan:", error);
              Swal.fire("Error!", "There was an issue deleting the test plan.", "error");
            });
        },
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
