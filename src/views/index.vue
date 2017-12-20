<style scoped>
</style>
<template>
    <div>
        <my-header></my-header>
        <my-lefter></my-lefter>
        <my-footer></my-footer>
    </div>
</template>
<script>
  import myHeader from '../common/header'
  import myFooter from '../common/footer'
  import myLefter from '../common/lefter'
  export default {
    name: 'index',
    components: {myHeader, myFooter, myLefter},
    created() {
      this.$router.push({
        path: '/rec'
      })
    }

  }
</script>
