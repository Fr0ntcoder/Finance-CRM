<template>
  <div class="wrap">
    <h2 class="inner-title">{{"Score" | localize}}<a href="#" @click.prevent="refresh" class="account-reload"><font-awesome-icon icon="redo-alt"/></a></h2>
    <Loader v-if="loading" />
    <div class="account-wrap" v-else>
      <Balance :rates="currency"/>
      <Currency :rates="currency"/>
    </div>
  </div>
</template>

<script>
import Balance from "@/components/Balance"
import Currency from "@/components/Currency"
import {mapActions} from "vuex"
export default {
  metaInfo() {
        return {
            title: this.$title("Home")
        }
    },
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    Balance,Currency
  },
  methods: {
    ...mapActions(["fetchCurrency"]),
    async refresh() {
      this.loading = true;
      this.currency = await this.fetchCurrency();
      this.currency = this.currency.Valute;
      this.loading = false;
    }
  },
  async mounted() {
    this.currency = await this.fetchCurrency();
    this.currency = this.currency.Valute;
    this.loading = false;
  }
}
</script>
<style lang="scss">
.account {
  &-wrap {
    display: flex;
    justify-content: space-between;
  }

}
</style>
