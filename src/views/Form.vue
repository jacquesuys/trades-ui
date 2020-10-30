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
                  :rules="dateRules"
                  readonly
                  required
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
          <v-col cols="12" md="6"> </v-col>
        </v-row>
        <!-- Date & Time pickers -->
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.trader"
              :items="tradersList"
              :loading="tradersLoading"
              label="Trader"
              :rules="traderRules"
              required
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
              :rules="bookRules"
              required
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
              <v-radio-group
                v-model="form.tradeType"
                :rules="tradeTypeRules"
                required
                dense
                row
              >
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
              :rules="counterpartyRules"
              required
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
              label="Product"
              :items="productsList"
              :loading="productsLoading"
              :rules="productRules"
              required
              dense
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Quantity"
              v-model="form.quantity"
              :rules="quantityRules"
              required
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
                  :rules="startDateRules"
                  required
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
                  :rules="endDateRules"
                  required
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
              :rules="pipelineRules"
              required
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
              :rules="zonesRules"
              required
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
              :rules="locationRules"
              required
              label="Location"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.unitOfMeasure"
              label="Unit of Measure"
              :items="unitsList"
              :rules="unitsRules"
              required
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
              required
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
        <v-row>
          <v-col cols="12" md="6">
            <fieldset>
              <legend>Price details</legend>
              <v-radio-group
                v-model="form.priceType"
                :rules="priceTypeRules"
                required
                dense
                row
              >
                <v-radio label="Float" value="float" dense></v-radio>
                <v-radio label="Fixed" value="fixed" dense></v-radio>
              </v-radio-group>
              <v-autocomplete
                v-if="form.priceType === 'fixed'"
                v-model="form.priceBasis"
                :items="priceBasisList"
                :rules="priceBasisRules"
                required
                label="Price Basis"
                outlined
                dense
              ></v-autocomplete>
              <v-text-field
                v-if="form.priceType === 'float'"
                v-model="form.priceBasis"
                :rules="priceBasisRules"
                required
                outlined
                dense
                min="0"
                type="number"
                label="Price Basis"
                hint="Specify the spread"
              ></v-text-field>
              <v-text-field
                v-model="form.spread"
                :rules="spreadRules"
                required
                outlined
                dense
                min="0"
                type="number"
                label="Spread"
                hint="Specify the spread"
              ></v-text-field>
            </fieldset>
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
      trader: "",
      book: "",
      tradeType: "",
      counterparty: "",
      priceType: "float",
      spread: "",
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
      deal: "Firm",
      unitOfMeasure: "mmcf"
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
    valid: false,
    unitsList: ["mmcf", "Bcf", "Tcf"],
    priceBasisList: ["Price Basis 1", "Price Basis 2"],
    dateRules: [
      v => (v && v.length > 0) || "You must specify the execution date"
    ],
    traderRules: [v => (v && v.length > 0) || "You must specify the trader"],
    bookRules: [v => (v && v.length > 0) || "You must specify the book"],
    tradeTypeRules: [
      v => (v && v.length > 0) || "You must specify the trade type"
    ],
    counterpartyRules: [
      v => (v && v.length > 0) || "You must specify the counter party"
    ],
    productRules: [v => (v && v.length > 0) || "You must specify the product"],
    quantityRules: [
      v => (v && v.length > 0) || "You must specify the quantity"
    ],
    startDateRules: [
      v => (v && v.length > 0) || "You must specify the delivery start date"
    ],
    endDateRules: [
      v => (v && v.length > 0) || "You must specify the delivery end date"
    ],
    pipelineRules: [
      v => (v && v.length > 0) || "You must specify the pipeline"
    ],
    zonesRules: [v => (v && v.length > 0) || "You must specify the zone"],
    locationRules: [
      v => (v && v.length > 0) || "You must specify the location"
    ],
    priceRules: [v => (v && v.length > 0) || "You must specify the price"],
    unitsRules: [
      v => (v && v.length > 0) || "You must specify the units of measure"
    ],
    priceTypeRules: [
      v => (v && v.length > 0) || "You must specify the price type"
    ],
    priceBasisRules: [
      v => (v && v.length > 0) || "You must specify the price basis"
    ],
    spreadRules: [v => (v && v.length > 0) || "You must specify the spread"]
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
