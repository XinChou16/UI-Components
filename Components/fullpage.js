/**
 * Fullpage component
 */

 class Fullpage {
   constructor(options) {
     let defaultOptions = {
       element: '',
       duration: '1s',
     }
     this.options = Object.assign({}, defaultOptions,options);
     this.isAnimating = false;
     this.currentIndex = 0;
     this.checkOptions().initHtml().bindEvents();
   }

   checkOptions() {
    if(!this.options.element) {
      throw new Error('element is necessary')
    }
    return this;
   }

   initHtml() {
    this.options.element.css('overflow', 'hidden');
    this.options.element.children().each( (index,section) => {
      $(section).css('transition', `transform ${this.options.duration}`)
    })
    return this;
   }

   bindEvents() {
     this.options.element.on('wheel', e => {
       let targetindex = this.currentIndex + (e.originalEvent.deltaY > 0 ? 1 : -1); 
       console.log('当前index',targetindex);
       if(targetindex<0 || targetindex>=this.options.element.children().length){
         return;
       }else {
        this.options.element.children().each( (index,section) => {
          $(section).css('transform', `translateY(${-100*targetindex}%)`)
          this.currentIndex = targetindex;
        })
       }
     })
   }
 }

new Fullpage({
  element: $('.page')
})