<template>
	<div class="layout">
		<Menu mode="horizontal" theme="dark">
			<div class="layout-nav">
					<MenuItem name='1'>
						<Icon type="social-github"></Icon>
						GitHub评审辅助系统
					</MenuItem>

        <router-link to='/rec'>
          <MenuItem name='2'>
						<Icon type="android-happy"></Icon>
						评审者推荐
					</MenuItem>
        </router-link>

				<router-link to="/predict">
					<MenuItem name='3'>
						<Icon type="ios-eye"></Icon>
						评审结果预测
					</MenuItem>
				</router-link>

        <MenuItem name='3' style="right: 5px; position:absolute;">
          <Icon type="link"></Icon>
          powered by <a href="https://ayonel.me" target="_blank">ayonel.me</a>
        </MenuItem>

			</div>
		</Menu>
	</div>
</template>

<script>
  export default {
    props:['active_org'],
    data () {
      return {

      }
    },
    created () {
      console.log(this.active_org)
    }

  }
</script>

<style scoped>

</style>
