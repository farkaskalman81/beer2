<template>
  <div class="app">
    <div class="pagers">
      <div class="pager">
        <div @click="prevItem">
          <img class="arrow" src="@/assets/left.png" />
        </div>
      </div>
      <div class="goto">
        <div class="gototext">Go to:</div>
        <input v-model="actualitem" class="inputclass" />
        <!-- <button
          @click="setItem(actualitem)"
        >
          Go
        </button> -->
      </div>
      <div class="pager">
        <div @click="nextItem">
          <img class="arrow" src="@/assets/right.png" />
        </div>
      </div>
    </div>
    <div class="beer">
      <div class="imagediv">
        <img class="image" v-bind:src="item[0].image_url" />
      </div>
      <div class="datas">
        <div class="par">
          <div class="productname">{{ item[0].name }}</div>
        </div>
        <div class="par">
          Tagline
          <div class="ingredients">{{ item[0].tagline }}</div>
        </div>
        <div class="par">
          Description
          <div class="ingredients">{{ item[0].description }}</div>
        </div>
        <div class="par">
          Ingredients<br /><br />
          <div
            v-bind:key="value.name + value.add + value.attribute"
            v-for="value in item[0].ingredients.malt"
            class="ingredients"
          >
            Malt : {{ value.name }}
          </div>
          <div
            v-bind:key="value.name + value.add + value.attribute"
            v-for="value in item[0].ingredients.hops"
            class="ingredients"
          >
            Hop : {{ value.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Item from "@/components/Item.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  // components: { Item },
  created() {
    console.log("App vue created!!!");
    if (localStorage.getItem("lastitem")) {
      var localstorageItem = JSON.parse(localStorage.getItem("lastitem"));
      console.log(localstorageItem);
      if (localstorageItem[0].id > 1) {
        this.setItem(localstorageItem[0].id);
        console.log("volt localstorage elem" + localstorageItem);
      } else {
        console.log("NEM volt localstorage elem" + localstorageItem);
        this.setItem(1);
      }
    }
    this.getItem();
  },

  computed: {
    item: function () {
      return this.$store.state.item;
    },
    // actualitem: function () {
    //   return this.$store.state.actualitem;
    // },
    actualitem: {
      get() {
        return this.$store.state.actualitem;
      },
      set(val) {
        this.setItem(val);
      },
    },
  },

  methods: {
    getItem() {
      this.$store.dispatch("getItem");
    },
    nextItem() {
      this.$store.dispatch("nextItem");
      this.$store.dispatch("getItem");
    },
    prevItem() {
      this.$store.dispatch("prevItem");
      this.$store.dispatch("getItem");
    },
    setItem(val) {
      this.$store.dispatch("numberItem", val);
      this.$store.dispatch("getItem");
    },
  },
};
</script>

<style>
@media (min-width: 640px) {
  * {
  }
  .beer {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
}

@media (max-width: 639px) {
  * {
  }
  .beer {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
}
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}
.image {
  max-width: 200px;
  height: 200px;
}
.pagers {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  flex-basis: auto;
}
.pager {
  position: relative;
  margin: 10px;
  flex-basis: 0;
}
.datas {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-basis: auto;
}
.inputclass {
  width: 150px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
}
.goto {
  display: flex;
  align-items: center;
  gap: 10px;
}
.gototext {
  font-size: 18px;
  font-weight: bold;
}
.ingredients {
  padding-top: 5px;
  font-size: 16px;
  font-weight: normal;
  text-align: justify;
}
.par {
  font-size: 24px;
  font-weight: bold;
}
.arrow {
  width: 50px;
}
</style>
