---
title: 'How To Fix React Project Images'
smartdown: true
header: 'none'
---

### Move Images into src folder

Make an `images` folder in your `src` folder and move all your images there.

### Import your images

Any where you want to use an images you need to import it.

```
import homeBackground from "../images/homeBackground.png";

```

When you want to use it, refer to it like a variable.

```
<img className="homeBackground" src={homeBackground} alt=""></img>
```

