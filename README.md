# back-end

Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "authorization");
    next();
});

it took me 2 hours to find out why..all of the sudden, my frontend was getting cors error.
8:20
no matter what header I sent back, it didn't work. I look at heroku documentations, and I see this fucker:
https://devcenter.heroku.com/changelog-items/1086
8:21
comment out my router.put endpoint, works just fine.

Brandon  8:21 PM
Lol, so what do you do if you need that?

Shawn:awecid:  8:21 PM
still diggin on that one.
:joy:
1


Shawn:awecid:  8:26 PM
i found a hacky way to do it, that I'd yell at my work developers for doing.
8:27
But,
Add this in your server file before any of your server.use route calls :
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
8:27
so it'd be like this:
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/values", valuesRouter);
8:27
^ that little fella right there will get you hacked in 3 seconds, though. lol
:joy:
1


Brandon  8:29 PM
It's pretty inspiring how dedicated you are. I hope I start thinking that way once I don't feel so much pressure.

Shawn:awecid:  8:29 PM
it's spite. It's alllll spite. I don't like being outsmarted by my own stupidity. lol
:rolling_on_the_floor_laughing:
1


Brandon  8:30 PM
You're fucking killin me rn.
8:30
That's so good.
8:30
You watch curb your enthusiasm? Larry David opened a spite coffee shop.

Shawn:awecid:  8:31 PM
I haven't seen it in a long while, but I might start watching it again.
8:31
I'd totally go to spite coffee shop.

Brandon  8:46 PM
Is this the error you were getting?
image.png 
image.png
8:46
My front end guys are getting this.

Shawn:awecid:  8:47 PM
that's from the put request.
8:47
do the fix i showed ya above.
8:47
we're not really protecting any data, really.
8:52
your specific error is happening because of something called "Same-origin policy"
You have to specify which requests your server will allow, in your cause, Authorization.
you'll need this type of info:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization
8:52
same pattern.
8:54
but with the weird quotes and such. I copied that from my file directly from a comment I used to populate
8:55
here. I wrote it out fully, try this in your server file before all your endpoint calls.
8:56
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "authorization");
    next();
});
8:56
I have a lowercase authorization because that's what mine is labelled as. If you have uppercase, you'll have to change it.
8:57
oh hell, I'm confusing. put it here:
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "authorization");
    next();
});
server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/values", valuesRouter);
8:57
you can add this in there too, for good measure.
8:57
res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
8:57
as another header.
8:58
but you should just need the authorization header.