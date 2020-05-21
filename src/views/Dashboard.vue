<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="trades"
      :search="search"
    >
      <template v-slot:item.tradeType="{ item }">
        <v-chip :color="getColor(item.tradeType)" dark>
          <strong>{{ item.tradeType.toUpperCase() }}</strong>
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "Dashboard",
  data: () => ({
    data: [],
    search: "",
    loading: true,
    headers: [
      { value: "id", text: "ID" },
      { value: "tradeType", text: "Trade Type" },
      { value: "execution", text: "Execution Date" },
      { value: "trader", text: "Trader" },
      { value: "book", text: "Book" },
      { value: "counterparty", text: "Counterparty" },
      { value: "product", text: "Product" },
      { value: "deliveryDate", text: "Delivery Date" },
      { value: "location", text: "Location" }
    ]
  }),
  computed: {
    trades() {
      return this.data.map(entry => {
        return {
          ...entry,
          execution: `${this.formatDate(entry.executionDate)} ${entry.time}`,
          deliveryDate: this.formatDate(entry.deliveryDate)
        };
      });
    }
  },
  async created() {
    await this.axios
      .get("http://localhost:3000/trades")
      .then(({ data }) => {
        this.data = data;
      })
      .catch(() => (this.err = "Something went wrong with the server"))
      .finally(() => (this.loading = false));
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "MM/dd/yyyy");
    },
    getColor(type) {
      if (type === "buy") return "blue";
      if (type === "sell") return "green";
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100% !important;
}

li {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
</style>
