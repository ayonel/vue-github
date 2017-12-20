<style>
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
    <audio src="/static/recing.wav" autoplay="autoplay">
      Your browser does not support the audio tag.
    </audio>
    <Card>
      <Card>
        <Row>
          <Col span="22"><h1>推荐结果:</h1></Col>
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

        <h3>推荐决策者列表:</h3>
        <Row>
          <ButtonGroup>
            <Button :type=buttonType[index] v-for="(reviewer, index) in pull['predictReviewers']"
                    v-bind:data=reviewer
                    v-bind:key=reviewer
                    size="large"
              >
              {{reviewer}}
            </Button>
            <span></span>
          </ButtonGroup>
        </Row>
        <br/>
        <div id="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>

        <h3>实际决策者:</h3>
        <Row>
            <Button type="success" size="large">
              {{pull['actualReviewer']}}
            </Button>
        </Row>
        <br/>
        <div id="thin_line">
          <Row class-name="my_thin_row"></Row>
        </div>
        <h3>MRR得分:</h3>
        <Row>
          <Progress :percent="MRR">
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
        MRR : 0,
        show : false,
        buttonType: [],
        from_url: ''
      }
    },
    created () {
      this.handleSpinCustom()
      this.from_url = '/rec/'+this.$route.params.org+'/'+this.$route.params.page
      this.getPullinfo(this.$route.params.org, this.$route.params.number);
    },

    methods : {
      getPullinfo(org, number) {
        this.$http.get('/api/rec/'+org+'/'+number).then(response => {
            this.pull = response.data
            this.pull['created_at']=this.$utils.formatTimeStamp(this.pull['created_at'])
            this.MRR = this.calMRR(this.pull['predictReviewers'], this.pull['actualReviewer'])
            this.show = true
            this.buttonType = []
            for(var i in this.pull['predictReviewers']){
              if (this.pull['predictReviewers'][i] == this.pull['actualReviewer'])
                this.buttonType.push('success')
              else
                this.buttonType.push('error')
            }
            this.from_url = '/rec/'+org+'/'+this.$route.params.from_page
          },
          response => {
            alert(response.status())
          });
      },
      calMRR(predictReviewers, actualReviewer){
        if (predictReviewers.includes(actualReviewer))
          return 100/(predictReviewers.indexOf(actualReviewer)+1)
        else
          return 0.0;
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
                h('div',{'class': 'custom'}, '推荐中...')
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
