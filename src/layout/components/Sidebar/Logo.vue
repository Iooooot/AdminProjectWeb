<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!--<h1 class="">{{ title }} </h1>-->
        <div class="user_profle_side">
          <div class="user_img"><img class="img-responsive" :src="avatar" alt="#" /></div>
          <div class="user_info sidebar-title">
            <h6>{{name}}</h6>
            <p><span class="online_animation"></span> Online</p>
          </div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: require('@/assets/images/logo04.png')
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 80px;
  line-height: 100px;
  background: #304156;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      margin-bottom: 10px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 15px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

    .user_profle_side {
      display: flex;
      margin-left: 10px;
      padding-top: 8px;
      height: 100%;
    }

    .user_img img {
      width: 64px;
      height: 64px;
      border-radius: 100% 100%;
    }

    .user_info {
      width: 80px;
      p {
        font-size: 13px;
        font-weight: 500;
        color: #1ed085;
        margin: 0;
      }

      h6 {
        height: 20px;
        margin: 0 -25px 5px -5px;
        font-size: 17px;
        font-weight: 500;
        color: #fff;
        letter-spacing: 0;
      }

      p{
        color: #42b983;
        .online_animation {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: #42b983;
          border-radius: 100%;
          margin-top: 0;
          position: relative;
          top: 1px;
          -webkit-animation: online 2s infinite;
          animation: online 2s infinite
        }

        @-webkit-keyframes online {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes online {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }

    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
