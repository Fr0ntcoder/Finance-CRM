<template>
    <div class="account-block">
        <h3 class="account-title">{{"Currency-account" | localize}}</h3>
        <span class="account-value" v-for="cur of currencies" :key="cur">{{getCurrency(cur) | currency(cur)}}</span>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  props: ["rates"],
  name: "balance",
  data: () => ({
    currencies: ["RUB","USD","EUR"]
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
      getCurrency(currency) {
        return currency != "RUB" ? this.info.balance / this.rates[currency].Value : this.info.balance
      }
  }
}
</script>

<style lang="scss">
    .account {
  &-table {
    &__top {
      &-list {
        display: flex;
        padding-bottom: 10px;
        margin-bottom: 15px;
        justify-content: space-between;
        border-bottom: 1px solid #fff;
      }
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
    margin-bottom: 30px;
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