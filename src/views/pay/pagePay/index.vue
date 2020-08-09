<template>
  <div class="">
    <div class="fromTable">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="订单">
          <el-input v-model="order.orderNo" />
        </el-form-item>
        <!--      <el-form-item label="活动区域">-->
        <!--        <el-input v-model="formLabelAlign.region"></el-input>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="活动形式">-->
        <!--        <el-input v-model="formLabelAlign.type"></el-input>-->
        <!--      </el-form-item>-->
      </el-form>
      <el-button style="margin-top: 10px" type="primary" @click="pay">跳转支付</el-button>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import { getPayQr } from '@/api/pay'

export default {
  name: 'Pay',
  components: {
    QrcodeVue
  },
  data() {
    return {
      order: {
        orderNo: ''
      },
      value: 'https://qr.alipay.com/bax06876vpxgciu7407200e1',
      size: 300
    }
  },
  methods: {
    pay() {
      getPayQr(this.order.orderNo).then(response => {
        this.value = response.data
      })
    }
  }
}
</script>

<style scoped>

  .qrCode {
    text-align: center;
    margin-top: 30px;
  }

  .fromTable{
    text-align: center;
    margin-left:48%;
    transform: translateX(-50%);
    margin-top: 30px;
    max-width: 30%;
  }
</style>
