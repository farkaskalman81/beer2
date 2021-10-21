import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    item: [],
    actualitem: 1,
    errorvalue: 0,
  },
  mutations: {
    setItem: (state, item) => (state.item = item),
    nextItem: (state) => (state.actualitem += 1),
    prevItem: (state) => (state.actualitem -= 1),
    numberItem: (state, number) => (state.actualitem = parseInt(number)),
    setError: (state) => (state.errorvalue = 1),
    unsetError: (state) => (state.errorvalue = 0),
  },
  actions: {
    getItem: (context) => {
      let link = "https://api.punkapi.com/v2/beers/" + context.state.actualitem;
      console.log(link);
      axios
        .get(link, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          context.commit("setItem", res.data);
          localStorage.setItem("lastitem", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.error(error);
          context.commit("setError");
          setTimeout(function () {
            context.commit("unsetError");
          }, 3000);
        });
    },
    nextItem: (context) => {
      context.commit("nextItem");
    },
    prevItem: (context) => {
      context.commit("prevItem");
    },
    numberItem: (context, number) => {
      context.commit("numberItem", number);
    },
    setError: (context) => {
      context.commit("setError");
    },
    unsetError: (context) => {
      context.commit("unsetError");
    },
  },
  modules: {},
});
