import TradesService from "@/services/TradesService";

export const namespaced = true;

export const actions = {
  submit({ dispatch }, form) {
    return TradesService.submitTrade(form)
      .then(() => {
        const notification = {
          type: "success",
          message: "Your trade has been submitted!"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: "error",
          message: "There was a problem submitting your trade: " + err.message
        };
        dispatch("notification/add", notification, { root: true });
        throw err;
      });
  },
  save({ dispatch }, form) {
    return TradesService.saveTrade(form)
      .then(() => {
        const notification = {
          type: "success",
          message: "Your trade has been saved!"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: "error",
          message: "There was a problem saving your trade: " + err.message
        };
        dispatch("notification/add", notification, { root: true });
        throw err;
      });
  }
};
