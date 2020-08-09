<template>
  <div class="">
    <div class="qrCode">
      <qrcode-vue :value="value" :size="size" level="H" />
    </div>
    <div class="fromTable">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="订单">
          <el-input v-model="orderData.orderNo" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="orderData.productName" />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="orderData.totalAmount" />
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 10px" type="primary" @click="getQr">生成新的二维码</el-button>
      <el-button style="margin-top: 10px" type="primary" @click="pagePay">跳转支付页面</el-button>
    </div>
    <div class="fromTable">
      <div style="margin: 10px">
        退款
      </div>
      <el-form label-position="right" label-width="80px">
        <el-form-item label="订单">
          <el-input v-model="refundData.orderNo" />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="refundData.totalAmount" />
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 10px" type="primary" @click="refund">退款</el-button>
    </div>
    <div class="fromTable">
      <div style="margin: 10px">
        查询对账单
      </div>
      <el-form label-position="right" label-width="120px">
        <el-form-item label="订单类型">
          <el-radio v-model="billData.billType" label="trade">trade</el-radio>
          <el-radio v-model="billData.billType" label="signcustomer">signcustomer</el-radio>
        </el-form-item>
        <el-form-item label="订单开始时间">
          <el-date-picker
            v-model="billData.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 10px" type="primary" @click="downLoadBillURL">下载对账单</el-button>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import { getPayQr, getPagePay, refundOrder, downLoadBillURL, getBill } from '@/api/pay'

export default {
  name: 'Pay',
  components: {
    QrcodeVue
  },
  data() {
    return {
      billData: {
        billType: 'trade',
        startTime: '',
        url: ''
      },
      refundData: {
        orderNo: '',
        totalAmount: ''
      },
      orderData: {
        orderNo: '',
        productName: '',
        totalAmount: ''
      },
      value: 'https://qr.alipay.com/bax06876vpxgciu7407200e1',
      size: 300
    }
  },
  methods: {
    downLoadBillURL() {
      downLoadBillURL(this.billData).then(response => {
        var downloadElement = document.createElement('a')
        downloadElement.href = response.data
        downloadElement.download = '用户数据.csv.zip' // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(response.data) // 释放掉blob对象
      })
    },
    refund() {
      refundOrder(this.refundData).then(response => {
        console.log(response.data)
      })
    },
    pagePay() {
      getPagePay(this.orderData).then(response => {
        const div = document.createElement('div')
        div.innerHTML = response.data
        document.body.appendChild(div)
        document.forms[2].submit()
      })
    },
    getQr() {
      getPayQr(this.orderData).then(response => {
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

  .fromTable {
    text-align: center;
    margin-left: 48%;
    transform: translateX(-50%);
    margin-top: 30px;
    max-width: 30%;
  }
</style>
