
//创建canvas元素
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas)

//建立LightLoader构造函数
function LightLoader () {
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.w = 0;
    this.h = 20;
    this.vy = -5;
    this.par = [];
    this.color = null;
    this.hue = 0;
}

//原型中只放置改变对象属性的函数
LightLoader.prototype = {
    //设置前进方块信息
    setLoader: function () {
        this.w += 2;
        this.hue = this.hue > 320 ? 0 : ++this.hue
        //这里采用hsla调色，可以保持亮度不变
        this.color = 'hsla(' + this.hue + ', 70%, 40%, 1)';
    },
    

    //向数组中push粒子对象
    setParticles: function (height) {
        this.par.push({
            px: 100 + this.w - Math.random(),
            py: height,
            pw: Math.random() * 3,
            ph: Math.random() * 3,
            pvy: this.vy * Math.random(),
            pcolor: 'hsla(' + (this.hue+30) + ', 100%, 60%, 1)'
        })
    }
    

}

//通过new创造对象
var lightLoader = new LightLoader();


//通过lightLoader中的属性改变页面
var controlLoader = (function () {
    var lightLoader = null,
        hue = 0,
        raf = null;

    //绑定事件函数  
    // function bundleEvent() {
    //     canvas.addEventListener('mouseover', function () {
    //         raf = requestAnimationFrame(upDataLoader);
   
    //     })
    //     canvas.addEventListener('mouseout', function () {
    //         cancelAnimationFrame(raf)
    //     })
    // }
    //设置背景
    function createBg () {
        //设置背景信息
        ctx.fillStyle = '#000';
        ctx.fillRect(80, 40, 350, 150);
        ctx.fillStyle = '#2b2b2b'
        ctx.fillRect(100, 100, 300, 20);
    }

    //生成Loader
    function createLoader () {
        lightLoader.setLoader();
        ctx.fillStyle = lightLoader.color;
        ctx.fillRect(100, 100, lightLoader.w, 20);
    }
    //生成粒子
    function setParticles () {
        //添加粒子，此处有点冗余，其实可以在创建一个函数，控制粒子的数量和高度
        lightLoader.setParticles(102)
        lightLoader.setParticles(105)
        lightLoader.setParticles(108)
        lightLoader.setParticles(111)
        lightLoader.setParticles(113)
        lightLoader.setParticles(115)
        lightLoader.setParticles(118)
        //控制Loader宽度
        lightLoader.w = lightLoader.w > 300 ? 0 : lightLoader.w
        var n = lightLoader.par.length;
        //循环中遍历particals数组
        while(n--) {
            var ele = lightLoader.par[n]

            //超出画布的粒子，清除
            if(ele.py > 180) {
                lightLoader.par.splice(n, 1);
            }
            ctx.fillStyle = ele.pcolor;
            ctx.fillRect(ele.px, ele.py, -ele.pw, -ele.ph);
            

            ele.py += ele.pvy;
           
            ele.pvy = ele.pvy + Math.random() / (5/4) ; 
        }
    }
    //更新canvas
    function upDataLoader () {
        //每次更新先清理画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createBg();
        createLoader();
        
        
        setParticles()
        
        raf = requestAnimationFrame(upDataLoader);

    }

    //API接口
    function init(obj) {
        lightLoader = obj;
        //bundleEvent()
        requestAnimationFrame(upDataLoader)

    }
    return {
        init
    }

})()
controlLoader.init(lightLoader);



