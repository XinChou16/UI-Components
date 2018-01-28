/**
 * Dialog Component
 * @Author: Xin Chou
 */
class Dialog {
  constructor(options) {
    this.options = options;
    this.init();
  }
  
  init() {
    let {title, content, buttons} = this.options;
    let template = `
        <div class="dialog">
          <div class="dialog-wrap">
            <header class="dialog-header">${title}</header>
            <content class="dialog-content">${content}</content>
            <footer class="dialog-footer"></footer>
          </div>
        </div>`;
    let $dialog = $(template);
    buttons.map( (btn) => {
      let $btn = $(`<button>${btn.text}</button>`);
      $dialog.find('footer').append($btn);
      $btn.on('click',btn.action)
    })
    this.$dialog = $dialog;
  }
  
  
  open() {
    this.$dialog.appendTo('body');
    //this.marginalClose();
  }
  close() {
    this.$dialog.detach();
  }
  marginalClose() {
    $('body').on('click', (e) =>{
      let target  = this.$dialog;
      if(!target.is(e.target) && target.has(e.target).length === 0) {
        this.close();
        console.log(1)
      }
    })
  }
}


xin.onclick = function() {
  var dialog = new Dialog({
    title: '标题',
    content: '<b>欢迎</b>',
    buttons: [
      {
        text: '确认', 
        action: function() { 
            setTimeout( () => {
              dialog.close();
            },3000)
        }},
      {
        text: '取消', 
        action: function() {
          dialog.close()
        }},
    ]
  });
  dialog.open();
}