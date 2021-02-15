<template>
  <div class="auth-overlay">
      <form action="" @submit.prevent="sumbitLogin" class="auth-form" id="form-login">
          {{s}}
          <h3 class="auth-form__title">{{"Finance" | localize}}</h3>
          <div class="auth-form__group">
            <div class="input-field">
                <input class="validate" id="form-login__email" type="text"  name="form-login__email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
                <label for="form-login__email">{{"Enter-email" | localize}}</label>
            </div>
            <span class="form-error" v-if="$v.email.$dirty && !$v.email.required">{{"Enter-empty" | localize}}</span>
            <span class="form-error" v-else-if="$v.email.$dirty && !$v.email.email">{{"Enter-correct" | localize}}</span>
          </div>
          <div class="auth-form__group">
                <div class="input-field">
                    <input class="validate" id="form-login__password" type="password"  name="form-login__password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
                    <label for="form-login__password">{{"Enter-password" | localize}}</label>
                </div>
            <span class="form-error" v-if="$v.password.$dirty && !$v.password.required">{{"Enter-password" | localize}}</span>
            <span class="form-error" v-else-if="$v.password.$dirty && !$v.password.minLength"> {{"Min-password" | localize}} {{this.$v.password.$params.minLength.min}}({{password.length}})</span>
          </div>
          <button class="auth-form__btn">{{"Come" | localize}} <font-awesome-icon icon="paper-plane"/></button>
          <div class="auth-form__bottom">
              <span class="auth-form__bottom-text">{{"Not-account" | localize}}</span>
              <router-link  to="/register" class="auth-form__bottom-link"> {{"Registration" | localize}}</router-link>
          </div>
      </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';
import messages from "@/utils/messages"
import localizeFilter from '@/filters/localize.filter'
import {mapGetters,mapActions} from "vuex"
export default {
    metaInfo() {
        return {
            title: this.$title("Login")
        }
    },
    name: "login",
    data: () => ({
        email: "",
        password: "",
        s: null
    }),
    validations: {
        email: {email,required},
        password: {required,minLength: minLength(8)}
    },
    methods: {
        ...mapActions(["login"]),
        async sumbitLogin() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }

            const formData = {
                email: this.email,
                password: this.password
            }
            try {
                await this.login(formData);
                /* await this.$store.dispatch("login",formData); */
                this.$router.push("/");
            }catch(e) {}
        }
    },
    computed: {
        ...mapGetters(["info"])
    },
    async mounted() {
        if(messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
        console.log(this.info)
    }
}
</script>

<style lang="scss">
.auth {
    &-form {
        position: absolute;
        max-width: 500px;
        width: 100%;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        border-radius: 5px;
        padding: 30px;
        background: #fff;
        &__bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            &-text {
                font-size: 14px;
                margin-right: 10px;
            }
            &-link {
                text-transform: uppercase;
                color: var(--card-second);
            }
        }
        &__title {
            font-size: 25px;
            font-weight: 400;
            margin-bottom: 15px;
            color: #8f8c8c;
        }
        &__btn {
            display: flex;
            font-size: 16px;
            margin: 0 auto 15px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background:var(--btn-color);
            color: #fff;
            cursor: pointer;
            & svg {
                margin-left: 15px;
            }
        }
        &__group {
            position: relative;
            margin-bottom: 15px;
            & input:not([type="radio"]) {
            width: 100%;
            font-size: 14px;
            padding-bottom: 10px;
            margin-bottom: 30px;
            border-bottom: 1px solid #dad4d4;
            color: #8f8c8c;
            &::-moz-placeholder {
                color: #8f8c8c;
            }
            &::-webkit-input-placeholder {
                color: #8f8c8c;
            }
            &.invalid {
                border-color: red;
            }
            }   
        }
    }
    &-overlay {
        position: relative;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.5);
    }
}
</style>