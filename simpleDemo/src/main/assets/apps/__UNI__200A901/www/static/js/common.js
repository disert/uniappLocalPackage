//返回函数
export const back = (num) => {
	var num = num || 1;
	let canNavBack = getCurrentPages();
  if(canNavBack && canNavBack.length>1) {  
	uni.navigateBack({  
	  delta: num 
	});  
  } else {
	history.back(num);  
  }
}

export const tip = (prop) => {
	// #ifdef APP-PLUS
	plus.nativeUI.toast(prop);
	// #endif
	// #ifdef H5
	var body = document.body;
	var tqUUtip = document.getElementsByClassName('tq-uutip')[0];
	if(tqUUtip){
		body.removeChild(tqUUtip);
	}
	var boxx = document.createElement('DIV');
	boxx.classList.add('tq-uutip');
	var box = `
		<div style="pointer-events:none;position:fixed;bottom:100px;display:flex;justify-content: center;left:16px;right:16px;z-index:99;">
			<div style="border-radius:4px;padding:8px 14px;background:rgba(17,17,17,.7);color:#ffffff;font-size:16px;">${prop}</div>
		</div>
	`
	boxx.innerHTML = box;
	body.appendChild(boxx);
	setTimeout(() => {
		body.removeChild(boxx);
	},2000)
	// #endif
}

//格式化手机号 中间4位用*表示
export const phoneNum = (num) => {
	if(!num){
		return '';
	}
	return num.substr(0,3) + ' ' + "****" + ' ' + num.substr(7);
}

//格式化银行卡 显示头4位和后4位 中间用*表示
export const bankNum = (num) => {
	if(!num){
		return '';
	}
	let str = ""
	for(let i = 0;i < num.length - 8;i ++){
		str += '*'
	}
	return num.substr(0,4)+ ' ' + str + ' ' + num.substr(num.length - 4);
}

//数字格式化 超过10000就每个三位数加一个逗号 用户金额粉丝等数字过大的数字展示
export const numberF = (num) => {
	if(num < 10000){
		return num;
	}else if(!num){
		return 0;
	}else{
		let str = String(num);
		let strStart = str, strEnd = ''
		if (str.indexOf('.') != -1) {
		  strStart = str.split('.')[0];
		  strEnd = str.split('.')[1];
		}
		let len = strStart.length;
		let count = 0;
		let newStr = ''
		for (let i = len - 1; i >= 0; i--) {
		  if (count % 3 == 0 && count != 0) {
			newStr = strStart[i] + ',' + newStr
		  } else {
			newStr = strStart[i] + newStr;
		  }
		  count++;
		}
		if (strEnd) {
		  newStr = newStr + '.' + strEnd;
		}
		return newStr;
	}
}
//强制保留两位小数 不四舍五入用于价格展示
export const toDecimal2 = (num) => {
	if(!num){
		return 0;
	}
	num = num.toString();
	let index = num.indexOf('.');
	if(index !== -1){
		num = num.substring(0,2 + index + 1)
	}else{
		num = num.substring(0)
	}
	return parseFloat(num).toFixed(2)
}