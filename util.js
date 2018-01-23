let dom = {
    every: function(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
          fn.call(null, nodeList[i],i,nodeList)
        }
        return nodeList
    },

    unique: function(element, className) {
        dom.every(element.parentNode.children, el => {
            el.classList.removeClass(className)
        });
        element.addClass(className);
    },

    // 创建html片段
    // http://stackoverflow.com/a/35385518/1262580
    create: function(html, children) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        let node = template.content.firstChild;
        if(children) {
            dom.append(node, children)
        };
        return node;
    },


}

// https://github.com/FrankFang/wheels/blob/master/lib/dom/index.js