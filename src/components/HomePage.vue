<template>
  <v-container>
    <v-row>

      <v-col cols="12" class="mt-8 col-sm-12">
        <template>
          <v-row class="float-right">
            <v-btn
                color="primary"
                dark
                @click="fetchAndSave()"
            >
              Add New +
            </v-btn>


          </v-row>
        </template>

      </v-col>
      <v-col cols="12" class="ma-8 col-sm-12 mb-8" style="overflow-y: scroll; height:300px;">
        <!--        Form Modal-->

        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  id
                </th>
                <th class="text-left">
                  Picture
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in users"
                  :key="item.id"
              >
                <td>
                 {{item.id}}
                </td>
                <td>
                  <v-avatar>
                    <img
                        :src="item.picture"
                        alt="John"
                    >
                  </v-avatar>
                </td>
                <td>{{ item.first_name }} {{ item.last_name }}</td>
                <td>{{ item.email }}</td>
                <td><v-btn
                    depressed
                    color="primary"
                    @click="getUserDetail(item.id)"
                >
                  Edit
                </v-btn></td>
              </tr>
              <infinite-loading @infinite="getUserList"></infinite-loading>

              </tbody>
            </template>
          </v-simple-table>
        </template>
<!--        //dialog-->
        <template>
          <div class="text-center">
            <v-dialog
                v-model="dialog"
                width="1000"
            >

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  User Details
                </v-card-title>

<!--               {{formData}}-->
                <v-card>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Title*"
                              required
                              v-model="formData.title"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="First name*"
                              required
                              v-model="formData.first_name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Last name*"
                              required
                              v-model="formData.last_name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Email"
                              required
                              v-model="formData.email"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Phone"
                              required
                              v-model="formData.phone"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Street"
                              required
                              v-model="formData.street"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="City"
                              required
                              v-model="formData.city"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="State"
                              required
                              v-model="formData.state"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >

                          <v-text-field
                              label="State"
                              required
                              v-model="formData.country"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              label="Post Code"
                              required
                              v-model="formData.postcode"
                          ></v-text-field>
                        </v-col>


                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="updateUser()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>


              </v-card>
            </v-dialog>
          </div>
        </template>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/services/api.service";

export default {
  name: 'HelloWorld',

  data: () => ({
    snackbar: false,
    text: '',
    timeout: 2000,
    dialog: false,
    page:1,
    users: [],
    formData: {
      first_name: null,
      last_name: null,
      title: null,
      email: null,
      phone: null,
      gender: null,
      picture: null,
      street: null,
      city: null,
      state: null,
      country: null,
      postcode: null,
    }
  }),

  methods: {
    fetchAndSave() {
      //get new record
      this.axios.get("https://randomuser.me/api/").then(res => {
        let ApiData = res.data.results[0] // because we know there will be only a single record every time so will get it by its index

        this.formData.title = ApiData.name.title
        this.formData.first_name = ApiData.name.first
        this.formData.last_name = ApiData.name.last
        this.formData.email = ApiData.email
        this.formData.phone = ApiData.phone
        this.formData.gender = ApiData.gender
        this.formData.street = ApiData.location.street.name
        this.formData.city = ApiData.location.city
        this.formData.state = ApiData.location.state
        this.formData.country = ApiData.location.country
        this.formData.postcode = ApiData.location.postcode
        this.formData.picture = ApiData.picture.large
        // console.log(ApiData)

        // save record
        ApiService.post("api/createuser", this.formData).then(result => {
          // console.log(result)
          this.text =result.data._metadata.message
          this.snackbar =true
        });

      });
    },
    getUserList($state) {
      ApiService.get("api/getuserslist",this.page).then(res => {
        // this.users = res.data.records.data

        if (res.data.records.data.length) {
          this.page += 1;

          this.users.push(...res.data.records.data);
          $state.loaded();
        } else {
          $state.complete();
        }

      });

    },
    getUserDetail(id) {
      ApiService.getByid("api/getuser",id).then(res => {
        // this.users = res.data.records.data
        this.formData = res.data.records
        this.dialog = !this.dialog

      });
    },
    updateUser() {
      ApiService.post("api/updateuser",this.formData).then(res => {
        // this.users = res.data.records.data
        this.dialog = !this.dialog
        this.text =res.data._metadata.message
        this.snackbar =true
      });
    }
  },
  created() {

    // this.getUserList()

  }
}
</script>
