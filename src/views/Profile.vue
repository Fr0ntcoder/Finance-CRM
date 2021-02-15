<template>
  <div class="wrap">
      <h2 class="inner-title">{{"Profile" | localize}}</h2>
      <form action="" class="form" id="form-profile" @submit.prevent="submitProfile">
        <div class="form-group">
            <div class="input-field">
                <input class="validate" id="form-profile__name" type="text"  name="form-profile__name" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
                <label for="form-profile__name">{{"Enter-name" | localize}}</label>
            </div>
            <span class="form-error" v-if="$v.name.$dirty && !$v.name.required">{{"Enter-name" | localize}}</span>
        </div>
         <div class="switch profile-switch">
            <label>
            English
                <input type="checkbox" v-model="isRuLocale">
                <span class="lever"></span>
            {{"Russian" | localize}}
            </label>
        </div>    
        <button class="form-btn">{{"Update" | localize}}<font-awesome-icon icon="paper-plane"/></button>
    </form> 
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators"
import { mapGetters, mapActions} from 'vuex';
export default {
    metaInfo() {
        return {
            title: this.$title("Profile")
        }
    },
    name: "Profile",
    data: () => ({
        name: "",
        isRuLocale: true
    }),
    computed: {
        ...mapGetters(["info"])
    },
    mounted() {
        this.name = this.info.name;
        this.isRuLocale = this.info.locale === "ru-RU";
        setTimeout(() => {
            M.updateTextFields()
        })
    },
    validations: {
        name: {required}
    },
    methods: {
        ...mapActions(["updateInfo"]),
        async submitProfile() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            try {
                await this.updateInfo({
                    name: this.name,
                    locale: this.isRuLocale ? "ru-RU" : "en-US"
                })
            }catch(e) {

            }
        }
    }
}
</script>

<style lang="scss">
#form-profile {
    max-width: 300px;
    width: 100%;
}
.profile {
    &-create {
        max-width: 500px;
        width: 100%;
        
    }
    &-switch {
        margin-bottom: 30px;
    }
}
</style>