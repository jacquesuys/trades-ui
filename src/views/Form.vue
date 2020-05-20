<template>
  <div>
    <h1>Form ID: {{ id }}</h1>
    <v-form ref="outgoingForm" v-model="formValidity">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <header>Direction</header>
            <v-radio-group v-model="direction" row>
              <v-radio :key="`outgoing`" :label="`Outgoing`" :value="`outgoing`"></v-radio>
              <v-radio :key="`incoming`" :label="`Incoming`" :value="`incoming`"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="applicant"
              :items="applicantList"
              label="Applicant"
              height="42"
              outlined
            ></v-select>
          </v-col>
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
              outlined
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
              outlined
              :disabled="direction === 'incoming'"
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
              outlined
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
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-select
              v-model="tranche"
              :rules="trancheRules"
              :items="trancheList"
              :disabled="direction === 'incoming'"
              label="Tranche"
              height="42"
              required
              outlined
            ></v-select>
          </v-col>
          <v-col col="12" md="6">
            <v-select
              v-model="issuingBank"
              :items="issuingBankList"
              :rules="issuingBankRules"
              label="Issuing Bank Name"
              height="42"
              required
              outlined
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
                  outlined
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
                  outlined
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
          <v-col col="12" md="6">
            <v-select
              v-model="currency"
              :items="currencyList"
              label="Currency"
              height="42"
              outlined
            ></v-select>
          </v-col>
          <v-col col="12" md="6">
            <v-text-field outlined label="Face Value"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-text-field outlined label="Tolerance"></v-text-field>
          </v-col>
          <v-col col="12" md="6">
            <v-text-field
              outlined
              label="New Issuance Fee"
              hint="If different from default"
              :disabled="direction === 'incoming'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-text-field
              outlined
              label="Autocancellation threshold"
              hint="Enter a threshold for cancellation, if applicable."
            ></v-text-field>
          </v-col>
          <v-col col="12" md="6">
            <v-text-field
              outlined
              label="Trade reference number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <header>Is the advising bank confirming?</header>
            <v-radio-group v-model="isAdvisingBankConfirming" row>
              <v-radio :key="`no`" :label="`No`" :value="`no`"></v-radio>
              <v-radio :key="`yes`" :label="`Yes`" :value="`yes`"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col col="12" md="6">
            <v-select
              v-model="advisingBank"
              :items="advisingBankList"
              label="Advising Bank Name"
              height="42"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="6">
            <v-textarea
              outlined
              name="input-7-1"
              label="LC description"
            ></v-textarea>
          </v-col>
        </v-row>
        <hr>
        <v-row>
          <v-col cols="12" center>
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
    currency: [],
    currencyList: ["USD", "GBP", "JPY"],

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

    advisingBank: "",
    advisingBankList: ["Bank 1", "Bank 2", "Bank 3"],

    applicant: "",
    applicantList: ["Applicant 1", "Applicant 2", "Applicant 3"],

    expiryDatePicker: false,
    expiryDate: "",
    expiryDateRules: [v => v.length > 0 || "Choose an expiration date"],

    isAdvisingBankConfirming: "",
    direction: "",

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
        timestamps: {
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
      });
    },
    submitForm() {
      this.postForm("forms")
        .then(() => this.resetForm())
        .catch(() => console.log("error"));
    },
    saveForm() {
      this.postForm("drafts");
    },
    init() {
      this.firstCreated = new Date().toISOString().substr(0, 10);
      this.id = Math.floor(Math.random() * 10000000);
    },
    resetForm() {
      this.$refs.outgoingForm.reset();
      this.init();
    }
  },
  created() {
    console.log("component", this.$store.state.draft);
    this.id = this.$store.state.draft.id;
    this.beneficiaryNames = this.$store.state.draft.beneficiaryNames;
    this.facility = this.$store.state.draft.facility;
    this.expiryDate = this.$store.state.draft.expiryDate;
    this.isIncomingForm = this.$store.state.draft.isIncomingForm;
    this.lcRefNumber = this.$store.state.draft.lcRefNumber;
    this.lcType = this.$store.state.draft.lcType;
    this.timestamps = this.$store.state.draft.timestamps;
    this.tranche = this.$store.state.draft.tranche;
    this.issuingBank = this.$store.state.draft.issuingBank;
    this.issuingDate = this.$store.state.draft.issuingDate;
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
