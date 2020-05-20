<template>
  <div>
    <h1>Form ID: {{ id }}</h1>
    <v-form ref="outgoingForm" v-model="formValidity">
      <v-container>
        <v-row>
          <span class="form-type-pre-label">Outgoing</span>
          <v-switch v-model="isIncomingForm" :label="`Incoming`"></v-switch>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="beneficiaryNames"
              :items="beneficiaryList"
              chips
              multiple
              label="Beneficary Names"
              :rules="beneficiaryRules"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="facility"
              :items="facilityList"
              :rules="facilityRules"
              label="Facility"
              height="42"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-text-field
              label="LC Reference Number"
              v-model="lcRefNumber"
              :rules="lcRefNumberRules"
              height="42"
              required
            ></v-text-field>
          </v-col>
          <v-col col="12" md="6">
            <v-select
              v-model="lcType"
              :items="lcTypeList"
              :rules="lcTypeRules"
              label="LC Type"
              height="42"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-select
              v-model="tranche"
              :rules="trancheRules"
              :items="trancheList"
              label="Tranche"
              height="42"
              required
            ></v-select>
          </v-col>
          <v-col col="12" md="6">
            <v-select
              v-model="issuingBank"
              :items="issuingBankList"
              :rules="issuingBankRules"
              label="Issuing Bank"
              height="42"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-menu
              ref="issuanceDatePicker"
              v-model="issuanceDatePicker"
              :close-on-content-click="false"
              :return-value.sync="issuanceDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="issuanceDate"
                  :rules="issuanceDateRules"
                  label="Issuance Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="issuanceDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="issuanceDatePicker = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.issuanceDatePicker.save(issuanceDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              ref="expiryDatePicker"
              v-model="expiryDatePicker"
              :close-on-content-click="false"
              :return-value.sync="expiryDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="expiryDate"
                  label="Expiry Date"
                  :rules="expiryDateRules"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="expiryDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="expiryDatePicker = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.expiryDatePicker.save(expiryDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              @click="submitForm"
              color="primary"
              :disabled="!formValidity"
            >
              Submit
            </v-btn>
            <v-btn @click="resetForm">Reset</v-btn>
            <v-btn @click="saveForm">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Outgoing",
  data: () => ({
    id: "",
    isIncomingForm: false,

    beneficiaryNames: [],
    beneficiaryList: ["John Doe", "Alan Smith", "Michael Scott"],
    beneficiaryRules: [v => v.length > 0 || "Choose a beneficiary"],

    facility: "",
    facilityList: ["Facility 1", "Facility 2", "Facility 3"],
    facilityRules: [v => v.length > 0 || "Choose a facility"],

    lcRefNumber: "",
    lcRefNumberRules: [v => v.length > 0 || "Specifiy the LC reference number"],

    lcType: "",
    lcTypeList: ["LC 1", "LC 2", "LC 3"],
    lcTypeRules: [v => v.length > 0 || "Choose a letter of credit type"],

    tranche: "",
    trancheList: ["Tranche 1", "Tranche 2", "Tranche 3"],
    trancheRules: [v => v.length > 0 || "Choose a tranche type"],

    issuingBank: "",
    issuingBankList: ["Bank 1", "Bank 2", "Bank 3"],
    issuingBankRules: [v => v.length > 0 || "Choose an issuing bank"],

    issuanceDatePicker: false,
    issuanceDate: new Date().toISOString().substr(0, 10),
    issuanceDateRules: [v => v.length > 0 || "Choose an expiration date"],

    expiryDatePicker: false,
    expiryDate: "",
    expiryDateRules: [v => v.length > 0 || "Choose an expiration date"],

    formValidity: false
  }),
  methods: {
    async postForm(location) {
      const {
        id,
        isIncomingForm,
        beneficiaryNames,
        facility,
        lcRefNumber,
        lcType,
        tranche,
        issuingBank,
        issuanceDate,
        expiryDate,
        firstCreated
      } = this;
      const data = {
        isIncomingForm,
        beneficiaryNames,
        facility,
        lcRefNumber,
        lcType,
        tranche,
        issuingBank,
        issuanceDate,
        expiryDate,
        id,
        meta: {
          firstCreated,
          lastUpdated: new Date().toISOString().substr(0, 10)
        }
      };
      return await fetch(`http://localhost:3000/${location}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
    },
    submitForm() {
      this.postForm('forms')
        .then(() => this.resetForm())
        .catch(() => console.log('error'));
    },
    saveForm() {
      this.postForm('drafts')
    },
    init() {
      this.firstCreated = new Date().toISOString().substr(0, 10);
      this.id = Math.floor(Math.random() * 10000000);
    },
    resetForm() {
      this.$refs.outgoingForm.reset();
      this.init();
    },
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
.form-type-pre-label {
  align-self: center;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 5px;
}
</style>
