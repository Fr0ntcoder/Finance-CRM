<template>
    <div class="category-editor__block">
        <form action="" class="form" id="form-update" @submit.prevent="sumbitUpdate">
            <h3 class="form-title">{{"Update" | localize}}</h3>
            <div class="form-group">
                <div class="input-field">
                    <select name="form-update__select" ref="select" v-model="current">
                        <option :value="cat.id" v-for="(cat,index) of categories" :key="index">{{cat.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="input-field">
                    <input class="validate" id="form-update__name" type="text"   v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
                    <label for="form-update__name">{{"Enter-the-title-category" | localize}}</label>
                </div>
                <span class="form-error" v-if="$v.name.$dirty && !$v.name.required">{{"Enter-the-title-category" | localize}}</span>
            </div>
            <div class="form-group">
                <div class="input-field">
                    <input class="validate" id="form-update__limit" type="number"   v-model.number="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
                    <label for="form-update__limit">{{"Min-value" | localize}}</label>
                </div>
                <span class="form-error" v-if="$v.limit.$dirty && !$v.limit.minValue">{{"Min-value" | localize}} {{$v.limit.$params.minValue.min}}</span>
            </div>
            <button class="form-btn">{{"Update" | localize}} <font-awesome-icon icon="paper-plane"/></button>
        </form>  
    </div>
</template>

<script>
import {required,minValue} from "vuelidate/lib/validators"
import {mapActions} from "vuex"
export default {
    name: "category-update",
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        name: "",
        limit: 50,
        select: null,
        current: null


    }),
    validations: {
        name: {required},
        limit: {required,minValue: minValue(10)}
    },
    methods: {
        ...mapActions(["categoryUpdate"]),
        async sumbitUpdate() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            try{
                const catData = {
                    id: this.current,
                    name: this.name,
                    limit: this.limit
                }
                await this.categoryUpdate(catData)
                this.$message("Категория успешно обновлена")
                this.$emit("updated",catData)
            }catch(e) {}
        }
    },
   async mounted() {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields()
    },
    watch: {
        current(catId) {
            const {name,limit} = this.categories.find(categ => categ.id === catId)
            this.name = name;
            this.limit = limit;
        }
    },
    created() {
        const {id, name, limit} = this.categories[0]
        this.current = id;
        this.name = name;
        this.limit = limit;
    },
    destroyed() {
        if(this.select && this.select.destroy) {
            this.select.destroy
        }
    },
}
</script>

<style lang="scss">

</style>