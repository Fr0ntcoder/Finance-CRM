<template>
    <div class="account-block">
          <h3 class="account-title">{{"Exchange-rates" | localize}}</h3>
          <div class="account-table">
            <ul class="account-table__top-list">
              <li class="account-table__top-item">{{"Currency" | localize}}</li>
              <li class="account-table__top-item">{{"Course" | localize}}</li>
              <li class="account-table__top-item">{{"Date" | localize}}</li>
            </ul>
            <ul class="account-table__list" v-for="cur in currencies" :key="cur">
              <li class="account-table__item">{{cur}}</li>
              <li class="account-table__item">{{getCur(cur)}}</li>
              <li class="account-table__item">{{new Date() | date("date")}}</li>
            </ul>
          </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  props: ["rates",],
  name: "currency",
  data: () => ({
    currencies: ["RUB","USD","EUR"],
    curr: []
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    getCur(currency) {
        return currency != "RUB" ?  this.rates[currency].Value : 1
    }
  },
  mounted() {
    /* this.curr = Object.entries(this.rates).map(([key,value]) => {
      return {
        course: key,
        val: value.Value,
        date: new Date()
      }
    })
    this.curr.filter(el => {
      if(el === 0) {
        return el
      }
    }) */
   /* this.cur = this.rates;
   this.cur.forEach(el => {
      return {
        value: el.Value,
        date: new Date()
      }
    }) */

    console.log(this.rates)
  }
}
</script>

<style lang="scss">
    .account {
  &-table {
    &__top {
      &-item {
        width: 33.33%;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
      }
    }
    &__list {
        display: flex;
        padding-bottom: 10px;
        margin-bottom: 15px;
        justify-content: space-between;
        border-bottom: 1px solid #fff;
    }
    &__item {
        width: 33.33%;
        font-size: 14px;
        color: #fff;
      }

  }
  &-title {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #fff;
  }
  &-value {
    display: block;
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #fff;
    color: #fff;
  }
  &-wrap {
    display: flex;
    justify-content: space-between;
  }
  &-block {
    padding: 30px;
    &:first-child {
      width: 30%;
      background: var(--card-first);
    }
    &:last-child {
      width: 65%;
      background: var(--card-second);
    }
  }
  &-reload {
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 5px;
    background: var(--btn-color);
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
    color: #fff;
    &:hover {
      opacity: .7;
    }
  }
}
</style>