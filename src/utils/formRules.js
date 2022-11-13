import { isvalidPhone, validEmail } from '@/utils/validate'

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
  code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
}

const myTestRules = {
  num: [{ required: true, message: '请输入需要转换的数字', trigger: 'blur' }]
}

const findPwdRules = {
  account: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
  code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }],
  pwd01: [{ required: true, trigger: 'blur', message: '新密码不能为空' }],
  pwd02: [{ required: true, trigger: 'blur', message: '重复新密码不能为空' }]
}

const editUserInfoRules = {
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
  phone: [{ required: true, trigger: 'blur', validator: validPhone }]
}

const editPwdRules = {
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPass: [
    { required: true, message: '请输入重复密码', trigger: 'blur' }
  ]
}
const editEmailRules = {
  email: [{ required: true, validator: validMail, trigger: 'blur' }],
  code: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const userFormRule = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nick_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
  email: [{ required: true, validator: validMail, trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const roleFormRule = {
  name: [{ required: true, validator: validRoleName, trigger: 'blur' }],
  level: [{ required: true, message: '请输入等级', trigger: 'blur' }],
  description: [{ required: true, message: '请输入中文描述', trigger: 'blur' }]
}

const meetingFormRule = {
  date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
  time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
  meetNum: [{ required: true, message: '请输入会议号', trigger: 'blur' }],
  title: [{ required: true, message: '请输入会议主题', trigger: 'blur' }],
  host: [{ required: true, message: '请输入会议发起人', trigger: 'blur' }]
}

const menuFormRule = {
  number: [{ required: true, message: '请输入子节点个数', trigger: 'blur' }],
  title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
  type: [{ required: true, message: '请输入菜单级别', trigger: 'blur' }],
  menu_sort: [{ required: true, message: '请输入菜单排序', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入图标class名', trigger: 'blur' }],
  path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
  i_frame: [{ required: true, message: '请输入是否外链', trigger: 'blur' }],
  cache: [{ required: true, message: '请输入是否缓存', trigger: 'blur' }],
  hidden: [{ required: true, message: '请输入是否隐藏', trigger: 'blur' }]
}

const alipayRules = {
  subject: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
  totalAmount: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
  body: [{ required: true, message: '商品描述不能为空', trigger: 'blur' }]
}

export { loginRules, myTestRules, findPwdRules, editUserInfoRules, editPwdRules, editEmailRules, userFormRule,
  roleFormRule, meetingFormRule, menuFormRule, alipayRules }
// 自定义验证
function validPhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

function validMail(rule, value, callback) {
  if (value === '' || value === null) {
    callback(new Error('新邮箱不能为空'))
  } else if (validEmail(value)) {
    callback()
  } else {
    callback(new Error('邮箱格式错误'))
  }
}

function validRoleName(rule, value, callback) {
  const reg = /[^A-Za-z]/
  if (value === '' || value === null || value === undefined) {
    callback(new Error('角色名不能为空'))
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入全英文角色名'))
  }
}
