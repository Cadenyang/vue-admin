<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo" :class="{'collapsed': isCollapse ? 'collapsed' : ''}">
      <img :src="logoSrc">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical">
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data () {
    return {
      normalLogo: require('./images/logo.png'),
      miniLogo: require('./images/logo_mini.png')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    logoSrc () {
      return this.isCollapse ? this.miniLogo : this.normalLogo
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  box-sizing: border-box;
  padding: 20px;
  background: rgb(48, 65, 86);
  &.collapsed {
    padding: 20px 0 20px 10px;
  }
}
</style>
