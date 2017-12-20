<style>
  .ivu-table .predict {
    background-color: #495060;
    color: #2d8cf0;
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>

<template>
  <Col span="19">
    <Table border :columns="columns" :data="pulls_copy"></Table>
    <Page show-elevator :page-size=15 :total="total_pulls" :current="current_page" @on-change="onChange"></Page>
  </Col>
</template>

<script>
  export default {
    props:['pulls', 'type', 'active_org', 'total_pulls', 'from_page', 'current_page'],
    data () {
      return {
        columns: [
          {
            title: '编号',
            key: 'number'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '提交者',
            key: 'submitter'
          },
          {
            title: '提交时间',
            key: 'created_at'
          },
          {
            title: '操作',
            key: 'option',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  on: {
                    click: () => {
                      this.jumpToInfo(params.row['number'])
                    }
                  }
                }, this.type_copy),
              ])
            }

          }
        ],
        pulls_copy: [],
        type_copy: '推荐',
      }

    },

    methods :{
      initTable: function (){
        this.pulls_copy = this.pulls
        this.type_copy = this.type
        console.log(this.type_copy)
      },

      jumpToInfo: function(number) {
        if (this.type_copy == "推荐"){
          this.$router.push({
              path:'/rec_info/'+this.active_org+'/'+number+'/'+this.from_page
            })
        } else {
          this.$router.push({
            path:'/predict_info/'+this.active_org+'/'+number+'/'+this.from_page
          })
        }
      },
      onChange: function (page) {
        this.$emit("change-page", page)
      }
    },

    watch : {
      pulls() {
        this.initTable()
      },

    }
  }
</script>
