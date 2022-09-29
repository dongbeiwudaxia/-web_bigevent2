$(function () {
  // 点击去注册
  $('#go2Reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })

  // 点击去登录
  $('#go2Login').on('click', function () {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })


  // 从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可
      let pwd = $('.reg-wrap [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  

  // 给注册表单添加提交事件
  $('#formReg').on('submit', function (e) {
    e.preventDefault()

    // 发起ajax请求
    // 经过分析: 1.修改 Content-Type 2.需要将参数转成 json格式
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // contentType: 'application/json',
      // data: JSON.stringify({
      //   // 可以将对象转成json格式的字符串
      //   username: $('#formReg [name=username]').val(),
      //   password: $('#formReg [name=password]').val(),
      //   repassword: $('#formReg [name=repassword]').val()
      // }),
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg('注册成功，请登录')
        $('#go2Login').click()
      }
    })
  })

  $('#formLogin').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // contentType: 'application/json',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        // 跳转主页
        localStorage.setItem('token', res.token)
        // 固定的写法 Bearer token字符串、Bearer 译为持票人拿着token去请求
        location.href = '/home.html'
      }
    })
  })
})