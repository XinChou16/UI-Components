/**
 * tabs components
 */

class Tabs {
    constructor(options) {
        let defaultOptions = {
            element: '',
            originShow: 1,
        }
        // 默认option中相同属性会覆盖默认属性，结合到一个option对象里
        this.options = Object.assign({}, defaultOptions,options)
        console.log(this.options);
        this.checkOptions().init().bindEvents();
    }

    checkOptions() {
        if(!this.options.element) {
            throw new Error('element is necessary')
        }
        return this;
    }

    init() {
        // 页面可能存在多个tabs组件
        this.options.element.each( (index, element) => {
            $(element).children('.tabs-bar').children('li').eq(this.options.originShow).addClass('active');
            $(element).children('.tabs-content').children('li').eq(this.options.originShow).addClass('active');
        })
        return this;
    }

    bindEvents() {
        this.options.element.on('click', '.tabs-bar>li', function(e) {
            var $li = $(e.currentTarget);
            $li.addClass('active').siblings().removeClass('active');
            var index = $li.index(); // 记录下点击的tabsindex,然后显示对应的tab内容
            var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
            $content.addClass('active').siblings().removeClass('active')
          })
          return this;
    }
}