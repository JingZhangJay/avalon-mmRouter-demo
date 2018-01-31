//  require 配置项
require.config({
  baseUrl: "./src/js/lib/",
  paths: {
    avalon: 'avalon',
    mmRouter: 'mmRouter',
    mmHistory: 'mmHistory',
    domReady: 'domReady',
  },
  shim:{
      avalon: { exports: "avalon" },
      mmHistory:{ deps: ['avalon']},
      mmRouter:{ deps: ['avalon']},
  }
})

require(['mmHistory','mmRouter','domReady!'], function (){
  var vm = avalon.define({
    $id: 'user',
    pageUrl: '',  //  网站初始页面
    username: '张三疯',
  })

  function callback (){
    console.log(this.path);
    if(this.path === '/'){
      vm.pageUrl = './src/modules/welcome.html';  //  设置网站初始页面
    }else{
      //  通过路由来寻找页面位置
      //  path:  /业务模块初始页面/模块子页面
      var page_tail = this.path.split('/').slice(1);

      // console.log(page_tail);
      // if(page_tail.length === 1){
      //   vm.pageUrl = `./src/modules/${page_tail[0]}/${page_tail[0]}.html`;
      // }else{
      //   vm.pageUrl = `./src/modules/${page_tail[0]}/${page_tail[1]}.html`;
      // }

      vm.pageUrl = page_tail.length === 1 ? vm.pageUrl = `./src/modules/${page_tail[0]}/${page_tail[0]}.html`
      : vm.pageUrl = `./src/modules/${page_tail[0]}/${page_tail[1]}.html`; 
    }
  }

  avalon.router.get('/*path', callback);
  avalon.history.start({
    basepath: '/avalon',
  });
  avalon.scan();
})