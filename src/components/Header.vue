<template>
    <header class="header" v-click-outside="headerDropHide">
        <div class="header-block">
            <a href="#" @click.prevent="$emit('click')" class="header-menu">
                <font-awesome-icon icon="bars" />
            </a>
            <span class="header-date">{{date | date("date")}}</span>
        </div>
        <a href="#" class="header-user" @click.prevent="headerDropShow">
            <span class="header-user__link">{{setName}}</span>
            <span class="header-user__icon">
                <font-awesome-icon icon="sort-down" />
            </span>
        </a>
        <transition name="fade">
            <ul class="header-drop__list" v-show="isActive">
                <router-link tag="li" to="/profile" class="header-drop__item">
                    <a href="#" class="header-drop__link"><font-awesome-icon icon="user-circle" />{{"Profile" | localize}}</a>
                </router-link>
                <li class="header-drop__item">
                    <a href="#" class="header-drop__link" @click.prevent="logout"><font-awesome-icon icon="sign-out-alt" />{{"Exit" | localize}}</a>
                </li>
            </ul>
        </transition>
    </header>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
    name: "Header",
    data() {
        return {
            isActive: false,
            date: new Date(),
            interval: null
        }
    },
    methods: {
        headerDropShow: function() {
            this.isActive = !this.isActive;

        },
        headerDropHide: function() {
            this.isActive = false;

        },
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/login?message=logout")
        }
    },
    computed: {
        setName() {
            return this.$store.getters.info.name;
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.date = new Date()
        },1000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    directives: {
        ClickOutside
    }
}
</script>

<style lang="scss">
.header {
    position: relative;
    display: flex;
    min-height: 10vh;
    justify-content: space-between;
    padding: 0 15px;
    background: var(--bg-color);
    color: #fff;
    &-drop {
        &__list {
            position: absolute;
            right: 0;
            top: 100%;
            padding: 15px !important;
            box-shadow: 0 0 1px 1px rgba(0,0,0,.2);
            background: #fff;
            z-index: 999;
        }
        &__item {
            font-size: 14px;
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &__link {
            display: block;
            font-size: 18px;
            color: #000;
            & svg {
             margin-right: 15px;
            }
        }
    }
    &-block {
        display: inline-flex;
        align-items: center;
    }
    &-menu {
        font-size: 22px;
        margin-right: 15px;
        color: #fff;
    }
    &-date {
        font-weight: 600;
    }
    &-user {
        display: inline-flex;
        font-size: 20px;
        align-items: center;
        color: #fff;
        &__link {
            margin-right: 10px;
        }
        &__icon {
            margin-top: -5px;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>