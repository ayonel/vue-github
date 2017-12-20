<template>
	<div>
    <my-header :active_org="active_org"></my-header>
    <div class="layout">
      <Row type="flex">
        <my-lefter :orgs="orgs" :active_org="active_org" @change-org="listenOrgChanged"></my-lefter>
        <my-table
          :pulls="pulls"
          :type="type"
          :total_pulls="total_pulls"
          :active_org="active_org"
          :from_page="page"
          :current_page="current_page"
          @change-page="listenPageChanged">
        </my-table>
      </Row>
    </div>
  </div>
</template>

<script>
  import myHeader from '../common/header'
  import myFooter from '../common/footer'
  import myLefter from '../common/lefter'
  import myTable from '../common/table'

  export default {
    components: {
      myHeader,
      myFooter,
      myLefter,
      myTable
    },

    data () {
      return {
        orgs : [],
        active_org : "",
        active_number: 0,
        pulls:[],
        type:'预测',
        total_pulls: 0,
        page: 1,
        current_page:1
      }
    },
    created () {
      if (this.$route.path == "/predict"){
        this.getOrgs();
      } else{
        this.getOrgsOnly()
        this.active_org =  this.$route.params.org
        this.current_page =  parseInt(this.$route.params.page)
        this.getActiveOrgPulls(this.$route.params.org, this.$route.params.page)
      }
    },

    methods : {
      getOrgs : function () {
        this.$http.get('/api/predict/orgs').then(response => {
          this.orgs = response.data
          this.active_org = this.orgs[0]
          this.getActiveOrgPulls(this.active_org, 1)
        },
          response => {
          alert(response.status())
        });
      },
      getOrgsOnly : function () {
        this.$http.get('/api/predict/orgs').then(response => {
            this.orgs = response.data
          },
          response => {
            alert(response.status())
          });
      },

      getActiveOrgPulls: function (active_org, page) {
          this.$http.get('/api/predict/'+active_org+'/page/'+page).then(response => {
          this.pulls = []

          for (var pull in response.data) {
            var temp = {
              number: response.data[pull]['number'],
              title: response.data[pull]['title'],
              submitter: response.data[pull]['submitted_by'],
              created_at: this.$utils.formatTimeStamp(response.data[pull]['created_at']),
              option: 1,
            }
            this.pulls.push(temp)
          }
          this.getTotalPulls(this.active_org)
        },
        response => {
          alert(response.status())
        });
      },
      getTotalPulls: function (active_org) {
        this.$http.get('/api/predict/'+active_org+'/total_nums').then(response => {
            this.total_pulls = response.data
          },
          response => {
            alert(response.status())
          });
      },
      listenOrgChanged : function (org) {
        this.active_org = org
        this.current_page = 1
        this.pulls = this.getActiveOrgPulls(this.active_org, 1)
      },
      listenPageChanged: function (page) {
        this.page = page;
        this.getActiveOrgPulls(this.active_org, page)
      }
    }
  }
</script>

<style scoped>

</style>
