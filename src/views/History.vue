<template>
  <div class="wrap">
      <h2 class="inner-title">{{"History-record" | localize}}</h2>
      <div class="history-chart">
          <canvas ref="canvas"></canvas>
      </div>
      <Loader v-if="loading"/>
      <p class="center" v-else-if="!records.length">{{"Not-record" | localize}}</p>
      <HistoryTable :records="items" v-else/>
        <Paginate v-if="records.length"
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageChange"
            :prev-text="prevText"
            :next-text="nextText"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
            />
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable"
import paginationMixin from "@/mixins/pagination.mixin"
import localizeFilter from "@/filters/localize.filter"
import {Pie} from "vue-chartjs"
export default {
    metaInfo() {
        return {
            title: this.$title("History")
        }
    },
    name: "history",
    extends: Pie,
    mixins: [paginationMixin],
    data: () => ({
        loading: true,
        records: [],

    }),
    computed: {
        prevText() {
            return localizeFilter("Prev")
        },
        nextText() {
            return localizeFilter("Next")
        }
    },
    methods: {
        setup(categories) {
            this.setupPagination(this.records.map(record => {
                return {
                    ...record,
                    categoryName: categories.find(c => c.id === record.categoryId).name,
                    typeClass: record.type === "income" ? "green" : "red",
                    typeText: record.type === "income" ? "Доход" : "Расход",
                }
            }))
            this.renderChart({
                labels: categories.map(c => c.name),
                datasets: [{
                    label: 'Расходы по категориям',
                    data: categories.map(c => {
                        return this.records.reduce((total,r) => {
                            if(r.categoryId === c.id && r.type === "outcome") {
                             total += +r.sum;
                            }
                            return total;
                        },0)
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            })
        }
    },
    async mounted() {
       const categories = await this.$store.dispatch("fetchCategories")
       this.records = await this.$store.dispatch("fetchRecords")
       this.setup(categories);
       this.loading = false;
       console.log(this.records)
    },
    components: {
        HistoryTable
    }
}
</script>

<style lang="scss">
.history {
    &-chart {
        display: block;
        max-width: 700px;
        width: 100%;
        margin: 0 auto 30px;
    }
}
</style>