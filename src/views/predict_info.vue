<style scoped>
  .fat_line .my_fat_row {
    background: #495060;
    height: 40px
  }
  .thin_line .my_thin_row {
    background: #495060;
    height: 2px;
  }
  .ivu-spin-fullscreen{
    opacity: 1;
    background: #fff;
    z-index:10000
  }

  .ivu-spin-text {
    width: 200px;
  }

  .custom {
    font-size: 30px;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

<template>
  <div v-show="show">
    <audio src="/static/predicting.wav" autoplay="autoplay">
      Your browser does not support the audio tag.
    </audio>
    <Card>
      <Card>
        <Row>
          <Col span="22"><h1>预测结果:</h1></Col>
          <Col span="2">
          <router-link :to=from_url>
            <Button type="primary">
              <Icon type="chevron-left"></Icon>
              返回
            </Button>
          </router-link>
          </Col>
        </Row>
        <div class="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>

        <h3>预测评审结果:</h3>
        <Row>
          <Button v-if="pull['predict_merged']" type="success" size="large">
            接受
          </Button>
          <Button v-else="pull['predict_merged']" type="error" size="large">
            拒绝
          </Button>
            <span></span>
        </Row>
        <br/>
        <div id="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>

        <h3>实际评审结果:</h3>
        <Row>
          <Button v-if="pull['merged']" type="success" size="large">
            接受
          </Button>
          <Button v-else="pull['merged']" type="error" size="large">
            拒绝
          </Button>
        </Row>
        <br/>
        <div id="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>
        <h3>评估结果:</h3>
        <Row>
          <Progress :percent="ACC">
          </Progress>
        </Row>
      </Card>

      <!-- 分割线-->
      <div class="fat_line">
        <Row  class-name="my_fat_row">
          <Col span="24">col-24</Col>
        </Row>
      </div>

      <Card>
        <Row>
          <Col span="24"><h1>PR信息:</h1></Col>
        </Row>
        <div class="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>
        <p><strong>编号:</strong>{{pull['number']}}</p>
        <p><strong>标题:</strong>{{pull['title']}}</p>
        <p><strong>提交者:</strong>{{pull['submitted_by']}}</p>
        <p><strong>提交时间:</strong>{{pull['created_at']}}</p>
      </Card>
    </Card>
  </div>

</template>
<script>
  export default {
    data: function () {
      return {
        pull : {},
        show : false,
        from_url: '',
        ACC: 0
      }
    },
    created () {
      this.handleSpinCustom()
      // this.from_url = '/predict/'+this.$route.params.org+'/'+this.$route.params.page
      this.from_url = `/predict${this.$route.params.org}/${this.$route.params.page}`
      this.getPullinfo(this.$route.params.org, this.$route.params.number);
    },

    methods : {
      getPullinfo(org, number) {
        this.$http.get('/api/predict/'+org+'/'+number).then(response => {
            this.pull = response.data
            console.log(this.pull)
            this.pull['created_at']=this.$utils.formatTimeStamp(this.pull['created_at'])
            if (this.pull['merged'] == this.pull['predict_merged'])
              this.ACC = 100

            this.show = true
            this.from_url = '/predict/'+org+'/'+this.$route.params.from_page
          },

          response => {
            alert(response.status())
          });
      },
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div',
              [
                h('Icon', {
                  'class': 'demo-spin-icon-load',
                  props: {
                    type: 'load-c',
                    size: 58,
                  }
                }),
                h('div',{'class': 'custom'}, '预测中...')
              ]
            )
          }
        });
        setTimeout(() => {
          this.$Spin.hide();
        }, 800);

      }

    }
  }
</script>
