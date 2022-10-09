
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

export { loginRules, myTestRules, findPwdRules }
