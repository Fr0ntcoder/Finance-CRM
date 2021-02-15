<template>
    <div class="category-editor__block">
        <form action="" class="form" id="form-create" @submit.prevent="formCreate">
            <h3 class="form-title">{{"Create" | localize}}</h3>
            <div class="form-group">
                <div class="input-field">
                    <input class="validate" id="form-create__name" type="text"  name="form-create__name" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
                    <label for="form-create__name">{{"Enter-the-title-category" | localize}}</label>
                </div>
                <span class="form-error" v-if="$v.name.$dirty && !$v.name.required">{{"Enter-the-title-category" | localize}}</span>
            </div>
            <div class="form-group">
                <div class="input-field">
                    <input class="validate" id="form-create__limit" type="number"  name="form-create__limit" v-model.number="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
                    <label for="form-create__limit">{{"Min-value" | localize}}</label>
                </div>
                <span class="form-error" v-if="$v.limit.$dirty && !$v.limit.minValue">{{"Min-value" | localize}} {{$v.limit.$params.minValue.min}}</span>
            </div>
            <button class="form-btn">{{"Create" | localize}} <font-awesome-icon icon="paper-plane"/></button>
        </form>    
    </div>
</template>

<script>
import {required,minValue} from "vuelidate/lib/validators"
import localizeFilter from "@/filters/localize.filter"
import {mapActions} from "vuex"
export default {
    name: "category-create",
    data: () => ({
        name: "",
        limit: 50
    }),
    validations: {
        name: {required},
        limit: {required,minValue: minValue(10)}
    },
    methods: {
        ...mapActions(["createCategory"]),
        async formCreate() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            try {
                const category = await this.createCategory({
                name: this.name,
                limit: this.limit
            })
            this.name = "";
            this.limit = 50;
            this.$v.$reset()
            this.$message(localizeFilter("Create-category"))
            this.$emit("created",category)
            }catch(e) {
            }
            
        }
    },
    mounted() {
        M.updateTextFields()
    }
}
</script>

<style lang="scss">
.category {
    &-title {
        font-size: 22px;
        font-weight: 400; 
        margin-bottom: 15px; 
    }
    &-editor {
        &__wrap {
           display: flex;
           justify-content: space-between;
       }
       &__block {
           width: 50%;
           padding-right: 30px;
       }
    }
}
.form-group .input-field {
    margin: 0 0 40px !important;
}
</style>