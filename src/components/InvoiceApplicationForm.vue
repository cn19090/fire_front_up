<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElRow, ElCol, ElButton, ElIcon, ElSpace } from 'element-plus'

const formRef = ref(null)

const formData = reactive({
  name: '',
  phone: '',
  approvalDate: '',
  careerLevel: '',
  careerDirection: '',
  emailEnabled: false,
  email: '',
  payerType: '单位',
  payerName: '',
  invoiceName: '',
  invoiceCompany: '',
  taxId: '',
  agreement: false
})



const rules = {
  name: [
    { required: true, message: '请输入考生姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入报名注册手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  approvalDate: [
    { required: true, message: '请选择审核通过时间', trigger: 'change' }
  ],
  email: [
    { required: false, message: '仅限格式正确的QQ、126、163三种邮箱，其他邮箱无效。', pattern: /^[a-zA-Z0-9._%+-]+@(qq|163|126)\.com$/, trigger: 'change' }
  ],
  careerLevel: [
    { required: true, validator: (a, b, c) => { b == '' ? c(new Error(errorMessage)) : c() }, message: '请选择职业等级', trigger: 'blur' }
  ],
  careerDirection: [
    { required: true, validator: (a, b, c) => { b == '' ? c(new Error(errorMessage)) : c() }, message: '请选择职业方向', trigger: 'blur' }
  ],
  payerName: [
    { required: true, message: '请输入付款人名称', trigger: 'blur' }
  ],
  invoiceName: [
    { required: true, message: '请输入开票信息姓名', trigger: 'blur' }
  ],
  invoiceCompany: [
    { required: true, message: '请输入开票信息单位名称', trigger: 'blur' }
  ],
  taxId: [
    { required: true, message: '请输入缴款单位代码', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]{18}$/, message: '请输入正确的18位统一社会信用代码', trigger: 'blur' }
  ]
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 表单验证通过，提交数据
      console.log('表单数据:', formData)
      ElMessage.success('提交成功！')
    } else {
      ElMessage.error('请正确填写表单！')
      return false
    }
  })
}
onMounted(() => {
  formRef.value.validate()
})
</script>

<template>
  <div class="invoice-application-form">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="back-button">
        <i class="el-icon-arrow-left"></i>
      </div>
      <h1 class="title">山东省消防行业职业技能鉴定-开具缴费发票申请书</h1>
    </div>

    <!-- 提示说明区 -->
    <div class="notice-section">
      <el-divider></el-divider>
      <div class="notice-content">
        <p>请收到审核通知短信的新报考考生认真填写并开具发票信息，因信息填写错误导致的<span class="highlight">错票不予更改</span>。</p>
      </div>
    </div>

    <!-- 表单主体区 -->
    <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="application-form">
      <!-- 考生姓名 -->
      <el-form-item label="1 考生姓名" prop="name">
        <el-input v-model="formData.name" placeholder="填写考生姓名输入区">
          <template #prepend>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 报名注册手机号 -->
      <el-form-item label="2 报名注册手机号" prop="phone" style="margin-top: 30px;">
        <el-input v-model="formData.phone" placeholder="填写报名系统中的手机号码">
          <template #prepend>
            <el-icon>
              <Iphone />
            </el-icon>
          </template>
        </el-input>

      </el-form-item>

      <el-alert type="info" show-icon :closable="false">
        <p>
          请填写报名系统中的手机号码，务必填写准确，系统将根据手机号获取考生相关信息。
        </p>
      </el-alert>

      <!-- 审核通过时间 -->
      <el-form-item label="3 审核通过时间" prop="approvalDate" style="margin-top: 30px;">
        <el-date-picker v-model="formData.approvalDate" type="date" placeholder="填写审核通过时间"
          style="width: 100%"></el-date-picker>
      </el-form-item>

      <!-- 职业等级、方向 -->
      <el-form-item label="4 职业等级、方向" required style="margin-top: 30px;">
        <el-col :span="8">
          <el-form-item prop="careerLevel">
            <el-select v-model="formData.careerLevel" placeholder="请选择级别">
              <el-option label="初级" value="初级"></el-option>
              <el-option label="中级" value="中级"></el-option>
              <el-option label="高级" value="高级"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1"></el-col>

        <el-col :span="8">
          <el-form-item prop="careerDirection">
            <el-select v-model="formData.careerDirection" placeholder="请选择职业方向">
              <el-option label="消防设施操作员" value="消防设施操作员"></el-option>
              <el-option label="消防安全管理员" value="消防安全管理员"></el-option>
              <el-option label="消防员" value="消防员"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="5 邮箱" prop="email" style="margin-top: 30px;">

        <el-input v-model="formData.email" placeholder="填写有效邮箱地址" style="margin-top: 10px">
          <template #prepend>
            <el-icon>
              <MessageBox />
            </el-icon>
          </template>
        </el-input>

      </el-form-item>
      <el-alert type="info" show-icon :closable="false">
        <p>
          可以不填写，仅限QQ、126、163三种邮箱，其他邮箱无效。请关注【山东财政电子票据微信公众号】并注册绑定手机号码，作为领取票据的有效途径。
        </p>
      </el-alert>
      <el-form-item label="6 付款人名称（抬头）" required style="margin-top: 30px;margin-bottom: 0;">
        <el-col :span="6">
          <!-- 付款人名称（抬头） -->
          <el-form-item>
            <el-select v-model="formData.payerType" placeholder="请选择付款人类型">
              <el-option label="单位" value="单位"></el-option>
              <el-option label="个人" value="个人"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 付款人名称（抬头） -->
          <el-form-item prop="payerName" style="margin-left: 10px">
            <el-input v-model="formData.payerName" placeholder="填写付款人名称"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-alert type="info" show-icon :closable="false">
        <p>
          单位开票必须填写单位名称，税号错误的系统将按个人开具。
        </p>
      </el-alert>

      <!-- 开票信息-姓名 -->
      <el-form-item label="7 开票信息-姓名" prop="invoiceName" style="margin-top: 30px;">
        <el-input v-model="formData.invoiceName" placeholder="填写开票信息姓名">
          <template #prepend>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 开票信息-单位名称 -->
      <el-form-item label="8 开票信息-单位名称" prop="invoiceCompany" style="margin-top: 30px;">
        <el-input v-model="formData.invoiceCompany" placeholder="填写开票信息单位名称">
          <template #prepend>
            <el-icon>
              <House />
            </el-icon>

          </template>
        </el-input>
      </el-form-item>

      <!-- 缴款单位代码（税号） -->
      <el-form-item label="9 缴款单位代码（税号）" prop="taxId" style="margin-top: 30px;">
        <el-input v-model="formData.taxId" placeholder="填写缴款单位代码">
          <template #prepend>
            <el-icon>
              <Tickets />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 温馨提示 -->
      <el-form-item label="10 温馨提示:" style="margin-top: 70px;">
        <div class="tips-container">
          <div class="tip-item">(1) 因信息填写错误导致的<span class="highlight">错票不予更改</span>；</div>
          <div class="tip-item">(2) 后期考生会通过短信收到20位缴款码，考生可使用支付宝、微信搜索进入"山东非税统缴平台"，输入20位缴款码，按提示完成缴费；</div>
          <div class="tip-item">(3) 逾期未缴费视为考生自动放弃本次考试安排；</div>
          <div class="tip-item">(4) 缴费状态将在缴费截止后统一更新，请耐心等待；</div>
          <div class="tip-item">(5) 请考生使用注册账户手机号码关注【山东财政电子票据微信公众号】并注册绑定手机号码，作为领取票据的有效途径；</div>
          <div class="tip-item">(6)
            济南考场：考试当天上午08:10、下午13:50、15:00、17:50工作人员将于训练与战勤保障支队（山东省济南市长清区丹桂路2777号）门口进行检录，考场不提供食宿车位；
          </div>
          <div class="tip-item">(7) 青岛考场：考试当天上午8:30、下午14:00，工作人员将于青岛市消防救援支队特勤大队驻救大队（山东省青岛市城阳区汇海路157号）门口进行检录，考场不提供食宿车位；
          </div>
          <div class="tip-item">(8) 潍坊考场：考试当天上午8:00、下午14:00，工作人员将于潍坊市奎文区文化南路2600齐鲁创智园F座门口进行检录，考场不提供食宿车位；</div>
          <div class="tip-item">(9) 济南站下午场次部分考生，实操鉴定考试将延长至夜间21时前完；</div>
          <div class="tip-item">(10) 一旦缴费成功则视为考生确认参加本次鉴定，考试费用不予退还。</div>
        </div>
      </el-form-item>

      <!-- 我已知晓 -->
      <el-form-item>
        <el-checkbox v-model="formData.agreement">我已知晓</el-checkbox>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm" :disabled="!formData.agreement">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped>
.invoice-application-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  margin-right: 15px;
  cursor: pointer;
  color: #409EFF;
  font-size: 20px;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.theme-button {
  color: #409EFF;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.theme-button i {
  margin-right: 5px;
}

.notice-section {
  margin-bottom: 20px;
}

.notice-content {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.5;
}

.highlight {
  color: #F56C6C;
  font-weight: bold;
}

.form-tip {
  font-size: 12px;
  color: #F56C6C;
  margin-top: 5px;
  line-height: 1.5;
}


.payer-type-selector {
  display: flex;
  align-items: center;
}

.tips-container {
  background-color: #f8f8f8;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
}

.tip-item {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.5;
}

.input-actions {
  display: flex;
  gap: 5px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-form-item__label {
  font-weight: bold;
}
</style>
