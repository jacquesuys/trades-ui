<template>
  <div>
    <v-form ref="tradeForm" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-dialog
              ref="executionDatePicker"
              v-model="executionDatePicker"
              :close-on-content-click="false"
              :return-value.sync="form.executionDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.executionDate"
                  label="Execution Date"
                  prepend-icon="event"
                  readonly
                  outlined
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.executionDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="executionDatePicker = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.executionDatePicker.save(form.executionDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="6">
            <v-dialog
              ref="timeModal"
              v-model="timeModal"
              :return-value.sync="form.time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.time"
                  label="Execution Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="timeModal" v-model="form.time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="timeModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.timeModal.save(form.time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- Date & Time pickers -->
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.trader"
              :items="tradersList"
              :loading="tradersLoading"
              label="Trader"
              dense
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.book"
              :items="booksList"
              :loading="booksLoading"
              :disabled="booksList.length === 0"
              label="Book"
              dense
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- trader & book -->
        <v-row>
          <v-col cols="12" md="6">
            <fieldset>
              <legend>Trade type</legend>
              <v-radio-group v-model="form.tradeType" row dense>
                <v-radio label="Buy" value="buy" dense></v-radio>
                <v-radio label="Sell" value="sell" dense></v-radio>
              </v-radio-group>
            </fieldset>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.counterparty"
              :items="counterpartiesList"
              :loading="counterpartyLoading"
              :disabled="counterpartiesList.length === 0"
              label="Counterparty"
              dense
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- trade type & counterparty -->
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.product"
              :items="productsList"
              :loading="productsLoading"
              label="Product"
              dense
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Quantity"
              v-model="form.quantity"
              type="number"
              hint="Specify the amount"
              min="0"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-dialog
              ref="deliveryStartDatePicker"
              v-model="deliveryStartDatePicker"
              :close-on-content-click="false"
              :return-value.sync="form.deliveryDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.deliveryStartDate"
                  label="Delivery Start Date"
                  prepend-icon="event"
                  readonly
                  dense
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.deliveryStartDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="deliveryStartDatePicker = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="deliveryStart">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="6">
            <v-dialog
              ref="deliveryEndDatePicker"
              v-model="deliveryEndDatePicker"
              :close-on-content-click="false"
              :return-value.sync="form.deliveryEndDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.deliveryEndDate"
                  label="Delivery End Date"
                  prepend-icon="event"
                  readonly
                  dense
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.deliveryEndDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="deliveryEndDatePicker = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="deliveryEnd">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.pipeline"
              :items="pipelinesList"
              :loading="pipelineLoading"
              :disabled="pipelinesList.length === 0"
              outlined
              dense
              label="Pipeline"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.zone"
              :items="zonesList"
              :loading="zonesLoading"
              :disabled="zonesList.length === 0"
              label="Zones"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.location"
              :items="locationsList"
              :loading="locationLoading"
              :disabled="locationsList.length === 0"
              label="Location"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.price"
              :items="pricesList"
              label="Price"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.broker"
              :items="brokersList"
              label="Broker"
              dense
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.commision"
              outlined
              dense
              min="0"
              type="number"
              label="Commision Rate"
              hint="Specify the amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.deal"
              :items="dealsList"
              label="Deal"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="form.comments"
              label="Comments"
              outlined
              dense
            ></v-textarea>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12" class="d-flex justify-space-between">
            <v-btn @click="submitForm" color="primary" :disabled="!valid">
              Submit
            </v-btn>
            <v-btn @click="resetForm">Reset</v-btn>
            <v-btn @click="saveForm">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar">
      {{ snackBarText }}
      <v-btn :color="snackColor" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    form: {
      executionDate: "",
      time: null,
      trader: "",
      book: "",
      tradeType: "",
      counterparty: "",
      price: "",
      product: "",
      quantity: "",
      deliveryStartDate: "",
      deliveryEndDate: "",
      pipeline: "",
      location: "",
      comments: "",
      broker: "",
      commision: "",
      zone: "",
      deal: "Firm"
    },
    dealsList: ["Firm", "Interruptable"],
    booksList: [],
    booksLoading: true,
    brokersList: [],
    brokersLoading: true,
    counterpartiesList: [],
    counterpartyLoading: true,
    locationsList: [],
    locationLoading: true,
    pipelinesList: [],
    zonesList: [],
    zonesLoading: true,
    pipelineLoading: true,
    pricesList: [],
    pricesLoading: true,
    deliveryStartDatePicker: false,
    deliveryEndDatePicker: false,
    executionDatePicker: false,
    productsList: [],
    productsLoading: true,
    tradersList: [],
    tradersLoading: true,
    snackbar: "",
    snackBarText: "",
    snackColor: "blue",
    timeModal: false,
    valid: false
  }),
  async created() {
    await this.axios
      .get("http://localhost:3000/books")
      .then(({ data }) => (this.booksList = data))
      .catch(err => console.error(`Couldn't load books: ${err}`))
      .finally(() => (this.booksLoading = false));

    await this.axios
      .get("http://localhost:3000/counterparty")
      .then(({ data }) => (this.counterpartiesList = data))
      .catch(err => console.error(`Couldn't load counterparties: ${err}`))
      .finally(() => (this.counterpartyLoading = false));

    await this.axios
      .get("http://localhost:3000/pipeline")
      .then(({ data }) => (this.pipelinesList = data))
      .catch(err => console.error(`Couldn't load pipelines: ${err}`))
      .finally(() => (this.pipelineLoading = false));

    await this.axios
      .get("http://localhost:3000/broker")
      .then(({ data }) => (this.brokersList = data))
      .catch(err => console.error(`Couldn't load brokers: ${err}`))
      .finally(() => (this.brokersLoading = false));

    await this.axios
      .get("http://localhost:3000/price")
      .then(({ data }) => (this.pricesList = data))
      .catch(err => console.error(`Couldn't load prices: ${err}`))
      .finally(() => (this.pricesLoading = false));

    await this.axios
      .get("http://localhost:3000/location")
      .then(({ data }) => (this.locationsList = data))
      .catch(err => console.error(`Couldn't load locations: ${err}`))
      .finally(() => (this.locationLoading = false));

    await this.axios
      .get("http://localhost:3000/zone")
      .then(({ data }) => (this.zonesList = data))
      .catch(err => console.error(`Couldn't load zones: ${err}`))
      .finally(() => (this.zonesLoading = false));

    await this.axios
      .get("http://localhost:3000/product")
      .then(({ data }) => (this.productsList = data))
      .catch(err => console.error(`Couldn't load products: ${err}`))
      .finally(() => (this.productsLoading = false));

    await this.axios
      .get("http://localhost:3000/traders")
      .then(({ data }) => (this.tradersList = data))
      .catch(err => console.error(`Couldn't load products: ${err}`))
      .finally(() => (this.tradersLoading = false));
  },
  methods: {
    submitForm() {
      this.$store
        .dispatch("form/submit", this.form)
        .then(() => this.resetForm());
    },
    saveForm() {
      this.$store.dispatch("form/save", this.form);
    },
    resetForm() {
      this.$refs.tradeForm.reset();
    },
    deliveryStart() {
      this.$refs.deliveryStartDatePicker.save(this.form.deliveryStartDate);

      if (
        this.form.deliveryEndDate === "" ||
        this.form.deliveryStartDate > this.form.deliveryEndDate
      ) {
        this.form.deliveryEndDate = this.form.deliveryStartDate;
      }
    },
    deliveryEnd() {
      this.$refs.deliveryEndDatePicker.save(this.form.deliveryEndDate);

      if (
        this.form.deliveryStartDate === "" ||
        this.form.deliveryStartDate > this.form.deliveryEndDate
      ) {
        this.form.deliveryStartDate = this.form.deliveryEndDate;
      }
    }
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
fieldset {
  border-radius: 5px;
  border: solid 1px rgb(180, 180, 180);
  outline-width: 0;
}
fieldset legend {
  font-size: 12px;
  padding: 0 3px;
  margin-left: 10px;
}
</style>
