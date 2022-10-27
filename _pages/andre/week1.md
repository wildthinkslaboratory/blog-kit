---
title: 'Week 1'
smartdown: true
header: 'none'
---

# Week 1
October 31 to November 4

## [Mental Health](::mycbt/button,transparent)
#### :::: mycbt
# --outlinebox 

- [](:Xcbt1) Watch this video ![thumbnail](https://www.youtube.com/watch?v=VdoSgPRe_gw)
- [](:Xcbt2) Watch this video ![thumbnail](https://www.youtube.com/watch?v=D0pxEmdHlqs)
- [](:Xcbt3) Watch this video ![thumbnail](https://www.youtube.com/watch?v=A1anXJhVamc&feature=youtu.be)
- [](:Xcbt4) Watch this video ![thumbnail](https://www.youtube.com/watch?v=UVN96JhDOmg)
- [](:Xcbt5) Watch this video ![thumbnail](https://www.youtube.com/watch?v=VdoSgPRe_gw)

# --outlinebox
# ::::






## [Linear Algebra](::mylinearalgebra/button,transparent)
#### :::: mylinearalgebra
# --outlinebox 

- [](:Xla1) Watch this video ![thumbnail](https://www.youtube.com/watch?v=TgKwz5Ikpc8&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=17)

- [](:Xla2) [Do this homework assignment](\pages\MomLA1)

# --outlinebox
# ::::


## [Rock Climbing](::myrc/button,transparent)
#### :::: myrc
# --outlinebox 
Go rock climbing three times this week.
- [](:Xrc1) Rock Climbing Day 1
- [](:Xrc2) Rock Climbing Day 2
- [](:Xrc3) Rock Climbing Day 3
# --outlinebox
# ::::


## [Sleep](::mysleep/button,transparent)
#### :::: mysleep
# --outlinebox 
Take melatonin at 8:00pm and no bright lights after 9:00pm.  I'll bring you the melatonin at 8:00pm, you just have to take them.  You can go to sleep whenever you want and get up when you want.  Try to get 5 out of 7 nights.

Today is [](:!date)
- [](:Xs1) Mon melatonin and dark 
- [](:Xs2) Tue melatonin and dark 
- [](:Xs3) Wed melatonin and dark 
- [](:Xs4) Thu melatonin and dark 
- [](:Xs5) Fri melatonin and dark 
- [](:Xs6) Sat melatonin and dark 
- [](:Xs7) Sun melatonin and dark 
# --outlinebox
# ::::


```javascript /autoplay

const d = new Date();
smartdown.setVariable('date', d.toString());

function initSDVar(lsvar) {
	const lv = localStorage.getItem(lsvar);
	if (lv !== null) {
		smartdown.setVariable(lsvar, lv == '1' ? true : false);
	}
	else smartdown.setVariable(lsvar, false);
}

const lvs = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 'la1', 'la2', 'rc1', 'rc2', 'rc3', 'cbt1', 'cbt2', 'cbt3', 'cbt4', 'cbt5'];
for (let i=0; i < lvs.length; i++) {
	initSDVar(lvs[i]);
}

this.dependOn = lvs;
this.depend = function() {
	localStorage.setItem('s1', (env.s1 ? '1' : '0'));
	localStorage.setItem('s2', (env.s2 ? '1' : '0'));
	localStorage.setItem('s3', (env.s3 ? '1' : '0'));
	localStorage.setItem('s4', (env.s4 ? '1' : '0'));
	localStorage.setItem('s5', (env.s5 ? '1' : '0'));
	localStorage.setItem('s6', (env.s6 ? '1' : '0'));
	localStorage.setItem('s7', (env.s7 ? '1' : '0'));
	localStorage.setItem('la1', (env.la1 ? '1' : '0'));
	localStorage.setItem('la2', (env.la2 ? '1' : '0'));
	localStorage.setItem('rc1', (env.rc1 ? '1' : '0'));
	localStorage.setItem('rc2', (env.rc2 ? '1' : '0'));
	localStorage.setItem('rc3', (env.rc3 ? '1' : '0'));
}
```




