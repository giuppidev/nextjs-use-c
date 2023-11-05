## Next.js `use c`

Use C programs in your Next.js app.


**The whole history on this video [here](http://www.youtube.com/watch?v=cxI71YH5jhI) (italian speaking)**

[![Youtube Video about how this project was made](http://img.youtube.com/vi/cxI71YH5jhI/0.jpg)](http://www.youtube.com/watch?v=cxI71YH5jhI "Ho creato 'use c' per Nextjs (e funziona!) 💣")

You can use it in server component: 

```javascript
return (
    <button
        formAction={async () => {
            "use c";

            #include<stdio.h>
            main()
            {
              printf("Hello Next!");
            }
        }}>
       Execute C
    </button>
)
```

Or in a server action file

```javascript
// actions.js
'use server'

export async function cHelloNext() {
    'use c'
    #include<stdio.h>
    main()
    {
      printf("Hello Next!");
    }
}
```

```javascript
// page.tsx
import {cHelloNext} from "../actions";
```

 

## Build 

You need to build the app to use it

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) 



## Credits

Inspired on the work on "use PHP" of bufferhead-code and the "use C" implementations of elnardu on React. 

* https://github.com/bufferhead-code/nextjs-use-php
* https://github.com/elnardu/react-use-c

## Disclaimer

*NEVER EVER USE THS IMPLEMENTATION ON ANY NEXT APPLICATION. THIS WAS MADE JUST FOR FUN.* 


