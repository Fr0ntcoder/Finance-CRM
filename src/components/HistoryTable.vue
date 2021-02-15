<template>
    <div class="history-table">
          <div class="history-table__top">
            <ul class="history-table__top-list">
                <li class="history-table__top-item">#</li>    
                <li class="history-table__top-item">{{"Date" | localize}}</li> 
                <li class="history-table__top-item">{{"Sum" | localize}}</li> 
                <li class="history-table__top-item">{{"Category" | localize}}</li> 
                <li class="history-table__top-item">{{"Type" | localize}}</li>     
                <li class="history-table__top-item">{{"Open" | localize}}</li>
            </ul>   
          </div>
          <div class="history-table__body">
              <ul class="history-table__list" v-for="(rec,i) of records" :key="i">
                  <li class="history-table__item">
                    {{i + 1}}
                  </li>
                  <li class="history-table__item">
                      {{rec.date | date("datetime")}}
                  </li>
                  <li class="history-table__item">
                      {{rec.sum | currency("RUB")}}
                  </li>
                  <li class="history-table__item">
                      {{rec.categoryName}}
                  </li>
                  <li class="history-table__item">
                      <span class="history-table__item-type" :class="[rec.typeClass]">{{rec.typeText  === "Расход" ? "Outcome" : "Income" | localize}}</span>
                  </li>
                  <li class="history-table__item">
                    <a href="#" @click.prevent="$router.push(`/detail/${rec.id}`)" class="history-table__item-link" v-tooltip="res">
                        <font-awesome-icon icon="external-link-alt"/>
                    </a>
                  </li>
              </ul>
          </div>
      </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
export default {
    props: {
        records: {
            type: Array,
            required: true
        }
    },
    name: "history-table",
    computed: {
        res() {
            return localizeFilter("Score")
        }
    },
    mounted() {
        /* this.s = localizeFilter("Score") */
        console.log(this.records)
    }
}
</script>

<style lang="scss">
.history {
    &-table {
        &__top {
            &-list {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #dad4d4;
            }
            &-item {
                font-size: 14px;
                font-weight: 600;
                &:nth-child(1) {
                    width: 5%;
                }
                &:nth-child(2) {
                    width: 20%;
                }
                &:nth-child(3) {
                    width: 20%;
                }
                &:nth-child(4) {
                    width: 20%;
                }
                &:nth-child(5) {
                    width: 20%;
                }
                &:nth-child(6) {
                    width: 15%;
                }
            }
        }
        &__list {
            display: flex;
            justify-content: space-between;
            padding-bottom: 15px;
            margin-bottom: 15px;
            border-bottom: 1px solid #dad4d4;
        }
        &__item {
            font-size: 14px;
            &-type {
                border-radius: 5px;
                padding: 5px;
                background: var(--card-second);
                color: #fff;
            }
            &-link {
                border-radius: 5px;
                padding: 5px 15px;
                background:var(--btn-color);
                transition: all 0.3s ease-in-out;
                box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
                color: #fff;
                &:hover {
                    opacity: 0.7;
                }
            }
            &:nth-child(1) {
                    width: 5%;
                }
                &:nth-child(2) {
                    width: 20%;
                }
                &:nth-child(3) {
                    width: 20%;
                }
                &:nth-child(4) {
                    width: 20%;
                }
                &:nth-child(5) {
                    width: 20%;
                }
                &:nth-child(6) {
                    width: 15%;
                }
        }
    }
}
</style>