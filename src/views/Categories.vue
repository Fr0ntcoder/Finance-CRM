<template>
    <div class="wrap">
        <h2 class="inner-title">{{"New-category" | localize}}</h2>
        <Loader v-if="loading"/>
        <div class="category-editor__wrap" v-else>
            <CategoryCreate @created="addNewCategory"/>
            <CategoryUpdate 
            :categories="categories"
            @updated="updateCategories" 
            :key="categories.length + updateCount" 
            v-if="categories.length"           
            />
            <p class="center" v-else>{{"Not-category" | localize}}</p>
        </div>
    </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate"
import CategoryUpdate from "@/components/CategoryUpdate"
import {mapActions} from "vuex"
import localizeFilter from "@/filters/localize.filter"
export default {
    metaInfo() {
        return {
            title: this.$title("Category")
        }
    },
    name: "Categories",
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }),
    components: {
        CategoryCreate,CategoryUpdate
    },
    methods: {
        ...mapActions(["fetchCategories"]),
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategories(category) {
            const idx = this.categories.findIndex(c => c.id === category.id)
            this.categories[idx].name = category.name
            this.categories[idx].limit = category.limit
            this.updateCount++;
        }
    },
    async mounted() {
        this.categories = await this.fetchCategories()
        /* this.categories = await this.$store.dispatch("fetchCategories") */
        this.loading = false;
    }
}
</script>
<style lang="scss">

.category {
    &-editor {
        &__wrap {
           display: flex;
           justify-content: space-between;
       }
    }
}
</style>