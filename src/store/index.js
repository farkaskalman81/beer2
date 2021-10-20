import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    item: [],
    actualitem: 1,
  },
  mutations: {
    setItem: (state, item) => (state.item = item),
    nextItem: (state) => (state.actualitem += 1),
    prevItem: (state) => (state.actualitem -= 1),
    numberItem: (state, number) => (state.actualitem = parseInt(number)),
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
          alert("Valami nem OK");
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
  },
  modules: {},
});
