<template>
  <div class="wrap">
      <h2 class="inner-title">{{"Planning" | localize}} <span class="planning-value">{{info.balance | currency("RUB")}}</span></h2>
      <Loader v-if="loading"/>
      <p class="center" v-else-if="!categories.length">{{"Not-category" | localize}}</p>
      <div class="planning-block" v-else v-for="cat of categories" :key="cat.id">
          <div class="planning-result">
                <span class="planning-result__text">{{cat.name}}: </span>
                {{cat.spend | currency("RUB")}} из {{"Of" | localize}} {{cat.limit | currency("RUB")}}
          </div>
          <div class="planning-progress" v-tooltip="cat.tooltip">
              <div class="planning-progress__inner" :class="[cat.progressColor]" :style="{width: cat.progressPercent + '%'}"></div>
          </div>
      </div>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currency.filter"
import {mapGetters,mapActions} from "vuex"
export default {
    metaInfo() {
        return {
            title: this.$title("Planning")
        }
    },
    name: "Planning",
    data: () => ({
        loading: true,
        categories: []
    }),
    methods: {
        ...mapActions(["fetchRecords","fetchCategories"])
    },
    computed: {
        ...mapGetters(["info"])
    },
    async mounted() {
        const records = await this.fetchRecords();
        const categories = await this.fetchCategories();
        this.categories = categories.map(cat => {
            const spend = records
            .filter(r => {
                return r.categoryId === cat.id
            })
            .filter(r => r.type === "outcome")
            .reduce((total,record) => {
                return total + parseInt(record.sum)
            },0)
            const percent = 100 * spend / cat.limit
            const progressPercent = percent > 100 ? 100: percent;
            const progressColor = percent < 60 ? "green" :percent < 100 ? "yellow": "red";
            const tooltipValue = cat.limit - spend;
            const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
            return {...cat,progressPercent,progressColor,spend,tooltip}
        })
        this.loading = false;
    }
}
</script>

<style lang="scss">
.planning {
    &-block {
        margin-bottom: 30px;
    }
    &-result {
        display: flex;
        font-size: 14px;
        align-items: center;
        margin-bottom: 15px;
        &__text {
            font-weight: 600;
            margin-right: 10px;
        }
    }
    &-progress {
        height: 5px;
        border-radius: 5px;
        background: #acece6;
        &__inner {
            width: 50%;
            height: 100%;
            background: #4CAF50;
        }
    }
}
</style>