<template>
    <div class="wrap">
        <Loader v-if="loading"/>
        <div class="detail-wrap" v-else-if="record">
            <ul class="breadcrumbs-list">
                <li class="breadcrumbs-item">
                    <router-link href="#" to="/history" class="breadcrumbs-link"> {{"History" | localize}}</router-link>
                </li>
                <li class="breadcrumbs-item"><font-awesome-icon icon="chevron-right"/></li>
                <li class="breadcrumbs-item">
                    <a href="#" @click.prevent class="breadcrumbs-link">{{record.type === "income" ? "Income": "Outcome" | localize}}</a>
                </li>
            </ul>
            <ul class="detail-list" :class="{
                'red': record.type === 'outcome',
                'green': record.type === 'income' 
            }">
                <li class="detail-item">{{"Description" | localize}}: {{record.description}}</li>
                <li class="detail-item">{{"Sum" | localize}}: {{record.sum | currency("RUB")}}</li>
                <li class="detail-item">{{"Category" | localize}}: {{record.categoryName}}</li>
                <li class="detail-item">{{"Date" | localize}}: {{record.date | date("datetime")}}</li>
            </ul>
        </div>
        <p class="center" v-else>{{"Record" | localize}} с id={{$route.params.id}}</p>
    </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    metaInfo() {
        return {
            title: this.$title("Detail-record")
        }
    },
    name: "Detail-record",
    data: () => ({
        record: null,
        loading: true
    }),
    methods: {
        ...mapActions(["fetchRecordById","fetchCategoryById"])
    },
    async mounted() {
        const id = this.$route.params.id;
        const record = await this.fetchRecordById(id);
        const category = await this.fetchCategoryById(record.categoryId);
        /* const record = await this.$store.dispatch("fetchRecordById",id)
        const category = await this.$store.dispatch("fetchCategoryById",record.categoryId); */
        this.record = {
            ...record,
            categoryName: category.name
        }
        this.loading = false;
    }
}
</script>

<style lang="scss">
.detail {
    &-list {
        display: inline-flex;
        flex-direction: column;
        padding: 15px 50px 15px 15px !important;
        border-radius: 5px;
        background: var(--card-second);
    }
    &-item {
        font-size: 14px;
        margin-bottom: 15px;
        color: #fff;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
    .breadcrumbs {
        &-list {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
        }
        &-item {
            font-size: 14px;
            margin-right: 15px;
        }
        &-link {
            font-size: 18px;
            color: #424242;
        }
    }
</style>