window.onload = function(){
	var oUl = document.getElementById('sale');//购买区
	var aSaleInput = oUl.getElementsByTagName('input');//购买金额
	var aBuyBtn = oUl.getElementsByTagName('button');//购买按钮
	var oIn = document.getElementById('in');//投币区
	var aInBtn = oIn.getElementsByTagName('input');//投币按钮
	var total = 0;//剩余余额
	var residue = document.getElementById('residue');//剩余金额显示
	var oResetBtn = document.getElementById('reset');//退币按钮
	var backShow = document.getElementById('back');//退出金额显示
	var outShow = document.getElementById('out');//出货区
	var outNameStr = [];
	var outName = {};//出货的商品名称
	var showOut = '';//出货区内容
	var showTotalValue = 0;//总消费金额
	var twenty = false;
	var twentySce;
	var times = document.getElementById('times');//剩余操作时间

	var EventUtil = {//事件绑定
		addHandler: function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,true);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}else{
				element['on'+type] = handler;
			}
		},
		removeHandler: function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,true);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handler);
			}else{
				element['on'+type] = null;
			}
		}
	}

	for(var i=0;i<aInBtn.length;i++){//投币点击事件
		aInBtn[i].index = i;
		EventUtil.addHandler(aInBtn[i],'click',function(){
			addNum(aInBtn[this.index].value);
			twenty = true;
			timer();
		});
	}

	for(var i=0;i<aBuyBtn.length;i++){//购买点击事件
		EventUtil.addHandler(aBuyBtn[i],'click',function(){
			saled(this);
			twenty = true;
			timer();
		});
	}

	EventUtil.addHandler(oResetBtn,'click',function(){//退币点击事件
			reset();
	});

	/*EventUtil.addHandler(endingBtn,'click',function(){//取货点击事件
			ending();
	});*/
	

	function sale(){//高亮显示可购买商品
		for(var i=0;i<aSaleInput.length;i++){
			if(-(parseInt(aSaleInput[i].value))<=total){
				aSaleInput[i].parentNode.className = 'active';
				var btns = aSaleInput[i].parentNode.getElementsByTagName('button');
				btns[0].removeAttribute('disabled');
			}else{
				aSaleInput[i].parentNode.className = '';
				var btns = aSaleInput[i].parentNode.getElementsByTagName('button');
				btns[0].setAttribute('disabled','disabled');
			}
		}
	}

	function addNum(num){//投币累加金额
		num = parseInt(num);
		if(num == 100 || num == 50){
			alert('不能投超过面值20的纸币');
		}else{
			total += num;
			residue.innerHTML = total;
		}
		sale();
	}

	function reset(){//退币重置
		backShow.innerHTML = total;
		total = 0;
		residue.innerHTML = total;
		sale();
		twenty = false;
		timer();
		outNameStr = [];
		showTotalValue = 0;//总消费金额
		outShow.innerHTML = '';
	}

	function saled(btn){//购买按钮点击事件
		var btnParent = btn.parentNode;
		var saleName = btnParent.getElementsByTagName('h4')[0].innerHTML.substr(3);
		var aInputVal = btnParent.getElementsByTagName('input');
		var cutNum = parseInt(aInputVal[0].value);
		total = total+cutNum;
		residue.innerHTML = total;
		sale();

		showTotalValue = showTotalValue-cutNum;

		//出货区outShow
		outNameStr.push(saleName);
		for(var i = 0;i<outNameStr.length;i++){
			if(!outName[outNameStr[i]]){
				outName[outNameStr[i]] = 1;
			}else{
				outName[outNameStr[i]]++;
			}
		}
		outShow.innerHTML = '';
		
		for(var attr in outName){
			var br = document.createElement('br');
			var p = document.createElement('p');
			p.textContent = (attr + '   数量：' + outName[attr]);
			outShow.appendChild(p);
			outShow.appendChild(br);
			p = null;
			br = null;
		}
		var totalSpan = document.createElement('span');
		totalSpan.textContent = '总计消费：'+showTotalValue+'元';
		outShow.appendChild(totalSpan);
		outName = {};

	}

	function timer(){//剩余操作时间事件
		clearInterval(twentySce);
		var step = 20;
		if(twenty){
			twentySce = setInterval(function(){
				step--;
				times.innerHTML = step;
				if(step == 0){
					reset();
					clearInterval(twentySce);
					twenty = false;
				}
			},1000);
		}else{
			clearInterval(twentySce);
			times.innerHTML = step;
		}
	}


}