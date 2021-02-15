<template>
  <div class="wrap">
      <h2 class="inner-title">{{"New-record" | localize}}</h2>
      <Loader v-if="loading"/>
      <form action="" class="form" id="form-new" @submit.prevent="submitNew" v-else-if="categories.length">
        <div class="form-group">
            <div class="input-field">
                <select name="form-new" ref="select" v-model="category">
                    <option
                    v-for="cat of categories"
                    :key ="cat.id" 
                    :value="cat.id">
                    {{cat.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="form-radio">
                <div class="form-radio__group">
                    <label>
                        <input type="radio" class="with-gap" name="form-new__radio" value="income" checked id="form-new__income" v-model="type"/>
                        <span>{{"Income" | localize}}</span>
                    </label>
                </div>
                <div class="form-radio__group">
                    <label>
                        <input type="radio" class="with-gap" name="form-new__radio" value="outcome" checked id="form-new__income" v-model="type"/>
                        <span>{{"Outcome" | localize}}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="input-field">
                <input type="number" class="validate" id="form-new__sum"  name="form-new__sum" v-model.number="sum" :class="{invalid: $v.sum.$dirty && !$v.sum.minValue}">
                <label for="form-new__sum">{{"Enter-sum" | localize}}</label>
            </div>
            <span class="form-error" v-if="$v.sum.$dirty && !$v.sum.minValue">{{"Min-value" | localize}}{{$v.sum.$params.minValue.min}}</span>
        </div>
        <div class="form-group">
            <div class="input-field">
                <input type="text"  class="validate" id="form-new__description" name="form-new__description" v-model="description" :class="{invalid: $v.description.$dirty && !$v.description.required}">
                <label for="form-new__description">{{"Enter-description" | localize}}</label>
            </div>
            <span class="form-error" v-if="$v.description.$dirty && !$v.description.required">{{"Enter-description" | localize}}</span>
        </div>
    <button class="form-btn">{{"Create" | localize}}<font-awesome-icon icon="paper-plane"/></button>
    </form>  
    <p class="center" v-else>Сначало нужно добавить категорию</p>
  </div>
</template>

<script>
import {required,minValue} from "vuelidate/lib/validators"
import localizeFilter from "@/filters/localize.filter"
import {mapGetters,mapActions} from "vuex"
export default {
    metaInfo() {
        return {
            title: this.$title("New-record")
        }
    },
    name: "record",
    data: () => ({
        loading: true,
        categories: [],
        records: [],
        category: null,
        select: null,
        type: "outcome",
        sum: 1,
        description: null
    }),
    computed: {
        ...mapGetters(["info"]),
        canCreateRecord() {
            if(this.type === "income")  {
                return true;
            }
            return this.info.balance >= this.sum
        }
    },
    methods: {
        ...mapActions(["createRecord","updateInfo","fetchCategories","fetchRecords"]),
        async submitNew() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            if(this.canCreateRecord) {
                try {
                    await this.createRecord({
                    categoryId: this.category,
                    sum: this.sum,
                    description: this.description,
                    type: this.type,
                    date: new Date().toJSON()
                })
                const balance = this.type === "income" ? this.info.balance + this.sum : this.info.balance - this.sum;
                await this.updateInfo({balance})
                this.$message(localizeFilter("Record-created-successfully"))
                this.$v.$reset();
                this.sum = 1;
                this.description = ""
                }catch(e) {

                }

            }else {
                this.$message(`${localizeFilter("Insufficient-funds-on-the-account")} (${this.sum - this.info.balance})`)
            }
        }
    },
    async mounted() {
        this.categories = await this.fetchCategories()
        this.records = await this.fetchRecords()
        this.loading = false;
        if(this.categories.length) {
            this.category = this.categories[0].id; 
        }
        setTimeout(() => {
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields()
        },0)

        console.log(this.categories)
    },
    validations: {
        sum: {required,minValue: minValue(1)},
        description: {required},
        type: {required}
    },
    watch: {
        type(value) {
            console.log(value)
        }
    },
    destroyed() {
        if(this.select && this.select.destroy) {
            this.select.destroy
        }
    }
}
</script>

<style lang="scss">

</style>