<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in data" :key="i">
        <v-expansion-panel-header>
          {{ item.id }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col v-for="(value, key) in item" :key="key" cols="12" md="6">
              <span class="label">{{ key }}:</span> {{ value }}
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "Trades",
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
  async created() {
    await this.axios
      .get("http://localhost:3000/drafts")
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

.label {
  text-transform: capitalize;
  color: grey;
}
</style>
