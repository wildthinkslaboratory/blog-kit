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
Watch 5 videos on mental health.
So far you've watched [](:!numMovies) movies.

- [](:Xcbt1) Watch this video ![thumbnail](https://www.youtube.com/watch?v=VdoSgPRe_gw)
- [](:Xcbt8) Watch this video ![thumbnail](https://www.youtube.com/watch?v=aAVGyRMS3gE)
- [](:Xcbt2) Watch this video ![thumbnail](https://www.youtube.com/watch?v=UVN96JhDOmg)
- [](:Xcbt3) Watch this video ![thumbnail](https://www.youtube.com/watch?v=NYIdmpp69MY)
- [](:Xcbt4) Watch this video ![thumbnail](https://www.youtube.com/watch?v=k0IgCE1uxB4)
- [](:Xcbt5) Watch this video ![thumbnail](https://www.youtube.com/watch?v=K24CS0mA5Fs&t=22s)
- [](:Xcbt6) Watch this video ![thumbnail](https://www.youtube.com/watch?v=iCvmsMzlF7o)
- [](:Xcbt7) Watch this video ![thumbnail](https://www.youtube.com/watch?v=psN1DORYYV0)
# --outlinebox
# ::::






## [Linear Algebra](::mylinearalgebra/button,transparent)
#### :::: mylinearalgebra
# --outlinebox 

- [](:Xla1) Watch this video ![thumbnail](https://www.youtube.com/watch?v=TgKwz5Ikpc8&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=17)

- [](:Xla2) [Do this homework assignment](\pages\MomLA1)

# --outlinebox
# ::::


## [Go Out!](::myrc/button,transparent)
#### :::: myrc
# --outlinebox 
##### Rock Climb
Go rock climbing three times this week.
- [](:Xrc1) Rock Climbing Day 1
- [](:Xrc2) Rock Climbing Day 2
- [](:Xrc3) Rock Climbing Day 3

##### The Big Beautiful World
![halfwidth](https://www.travelcraterlake.com/media/823251/crater-lake-wide-angle-view-121187657-2000.jpg?anchor=center&mode=crop&width=800&height=400&rnd=132890732730000000)
There's a big beautiful world out there! A walk in a beautiful area, bubble tea ... What would make you happy?

- [](:Xrc4) Write down 5 things out in the world that would be really enjoyable to do.
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

## [Celebrate](::mycelebrate/button,transparent)
#### :::: mycelebrate
# --outlinebox 
[](:Xc1) Celebrate your hard work 
# --outlinebox
# ::::

```javascript /autoplay

const d = new Date();
smartdown.setVariable('date', d.toString());

const movies = ['cbt1', 'cbt2', 'cbt3', 'cbt4', 'cbt5', 'cbt6', 'cbt7', 'cbt8'];

function moviesWatched() {
	let nm = 0;
	for (i in movies) {
		let lv = localStorage.getItem(movies[i]);
		if (lv == '1') nm++;
	}
	smartdown.setVariable('numMovies', nm)
}


function initSDVar(lsvar) {
	let lv = localStorage.getItem(lsvar);
	if (lv !== null) {
		smartdown.setVariable(lsvar, lv == '1' ? true : false);
	}
	else smartdown.setVariable(lsvar, false);
}

const lvs = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 'la1', 'la2', 'rc1', 'rc2', 'rc3', 'rc4', 'cbt1', 'cbt2', 'cbt3', 'cbt4', 'cbt5', 'cbt6', 'cbt7', 'cbt8', 'c1'];
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
	localStorage.setItem('cbt1', (env.cbt1 ? '1' : '0'));
	localStorage.setItem('cbt2', (env.cbt2 ? '1' : '0'));
	localStorage.setItem('cbt3', (env.cbt3 ? '1' : '0'));
	localStorage.setItem('cbt4', (env.cbt4 ? '1' : '0'));
	localStorage.setItem('cbt5', (env.cbt5 ? '1' : '0'));
	localStorage.setItem('cbt6', (env.cbt6 ? '1' : '0'));
	localStorage.setItem('cbt7', (env.cbt7 ? '1' : '0'));
	localStorage.setItem('c1', (env.c1 ? '1' : '0'));
	moviesWatched();
}
```




