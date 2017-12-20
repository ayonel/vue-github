<style scoped>
  .layout-menu-left{
    background: #464c5b;
  }

  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .ivu-menu-item {
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
<template>
  <Col span="5" class="layout-menu-left">
  <Menu active-name="1-2" theme="dark" width="auto" @on-select="onSelect">
      <div class="layout-logo-left"></div>
      <Submenu name="2" >
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          项目列表【{{active_org}}】
        </template>

        <MenuItem  :name=org
                   v-for="org in orgs"
                   v-bind:data=org
                   v-bind:key=org
        >
          {{org}}
        </MenuItem>
      </Submenu>
    </Menu>
  </Col>
</template>
<script>
  export default {
    props: ['orgs', 'active_org'],

    data: function () {
      return {
        active_org_copy: '',
      }
    },
    methods: {
      onSelect: function (org) {
        this.$emit("change-org", org)
      },
    },
  }
</script>
