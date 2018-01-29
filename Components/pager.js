/**
 * pager component
 * @author: Zhou.X
 */

 class Pager {
   constructor(options) {
     let defaultOptions = {
       element: null,
       currentPage: 2,
       totalPages: 20,
       visiblePage: 10,
       template: {
        number: '<span>{{page}}</span>',
        first: '<button class=first>首页</button>',
        last: '<button class=last>末页</button>',
        prev: '<button class=prev>上一页</button>',
        next: '<button class=next>下一页</button>',
       }
     }
     this.options = Object.assign({}, defaultOptions,options);
     this.domRefs = {};
     this.checkOptions().initHtml().bindEvents();
   }

   checkOptions() {
     if(!this.options.element) {
       throw new Error('element is necessary')
     }
     return this;
   }

  //  initial html 
  initHtml() {
    let $nav = $('<nav></nav>');
    this.options.element.append($nav); 
    let template = this.options.template;
    let $first = $(template.first);
    let $last = $(template.last);
    let $prev = $(template.prev);
    let $next = $(template.next);
    let $number = this._generatePage(this.options.visiblePage);
    this.domRefs = {$first, $last, $prev, $next, $number};
    this._checkPageBtn();

    $nav.append($first)
    $nav.append($prev)
    $nav.append($number)
    $nav.append($next)
    $nav.append($last)
    return this;
  }

  // 生成页码
  _generatePage() {
    let $ol = $('<ol data-role="pageNumbers"></ol>');
    let {currentPage,visiblePage,totalPages} = this.options;
    let start1 = Math.max(currentPage - visiblePage/2, 1); // 当前页小于中间的页数，渲染的页面范围从第一页开始
    let end1 = Math.min(start1+visiblePage-1, totalPages); // 结束页未达到总的页数，根据start+visibilePage来计算
    let end2 = Math.min(currentPage+ visiblePage/2-1, totalPages); // 结束页超过总的页数，取总的页数的值
    let start2 = Math.max(end2-visiblePage+1,1); // 结束页超过总页数，起始页根据end-visiblePage来计算
    let start = Math.min(start1, start2);
    let end = Math.max(end1, end2)
    console.log(`${start}-${end}页`);
    
    for (let i = start; i < end+1; i++) {
      let $li = $(`<li data-page=${i}><span>${i}</span></li>`);
      if(i == currentPage) {
        $li.addClass('active');
      }
      $ol.append($li)
    }
    return $ol;
  }

  _checkPageBtn() {
    if(this.options.currentPage == 1){
      this.domRefs.$first.attr('disabled', '');
      this.domRefs.$prev.attr('disabled', '');
    }else {
      this.domRefs.$first.removeAttr('disabled')
      this.domRefs.$prev.removeAttr('disabled')
    }
    if(this.options.currentPage == this.options.totalPages){
      this.domRefs.$last.attr('disabled', '');
      this.domRefs.$next.attr('disabled', '');
    }else {
      this.domRefs.$last.removeAttr('disabled')
      this.domRefs.$next.removeAttr('disabled')
    }
  }

  // 绑定事件
  bindEvents() {
    this.options.element.on('click', 'ol[data-role="pageNumbers"]>li', e => {
      let $li = $(e.currentTarget);
      let page = parseInt(e.currentTarget.dataset.page,10);

      this.options.currentPage = page; // 改变currentPage
      console.log('当前页为'+this.options.currentPage);
      this.changePage(page);
      $li.addClass('active').siblings().removeClass('active'); // 改变样式
      $li.attr('disabled','').siblings().removeAttr('disabled'); // 禁止点击
      this._checkPageBtn();
    })
    this.domRefs.$first.on('click', () => {
      this.changePage(1);
    })
    this.domRefs.$prev.on('click', () => {
      this.changePage(this.options.currentPage - 1);
    })
    this.domRefs.$next.on('click', () => {
      this.changePage(this.options.currentPage + 1);
    })
    this.domRefs.$last.on('click', () => {
      this.changePage(this.options.totalPages);
    })
  }

  changePage(page) {
    this.options.currentPage = page;
    // let search = '?page=';
    // search += page;
    // console.log(search);
    // location.search = encodeURIComponent(search);
    // this.options.element.dispatchEvent(new CustomEvent('pageChange', { detail: { page } }))
    // render
    this._checkPageBtn();
    let $newNumber = this._generatePage(this.options.visiblePage);
    let $oldNumber = this.domRefs.$number;
    $oldNumber.replaceWith($newNumber);
    this.domRefs.$number = $newNumber;
  }
 }



