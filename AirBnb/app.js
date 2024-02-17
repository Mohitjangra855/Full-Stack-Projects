const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
const wrapAsync = require("./utils/wrapasync");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js")

app.engine("ejs", ejsMate);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Mongoose Connect ..............

main()
    .then(() => {
        console.log("connection is successful");
    })
    .catch(() => {
        console.log("connection is not working");
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.listen(port, () => {
    console.log("App is listening...................");
})
let validateSchema = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// main root.....................
app.get("/", (req, res) => {
    res.redirect("/listing")

})
// index root.....................
app.get("/listing", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find();
    res.render("listing/index.ejs", { alllistings });

})
)

// new root.....................

app.get("/listing/new", (req, res) => {

    res.render("listing/new.ejs");
})

app.post("/listing", validateSchema, wrapAsync(async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    console.log("added data");

}))


// show root.....................
app.get("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const alllistings = await Listing.findById(id);

    res.render("listing/show.ejs", { alllistings })

}))
// Edit root.....................
app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing })

}))
// update route.....................
app.put("/listing/:id", validateSchema, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);

}))

// Delete root.....................
app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing")
    console.log(deleteListing);

}))

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Exists..!"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "something went worng" } = err;
    // res.status(status).send(message);
    res.render("error.ejs", { message })
})






// app.get("/testListing", async (req, res) => {

//     let sampleListing = new Listing({
//         title: "my new Car",
//         description: "car in the night",
//         price: 2200,
//         location: "Mojana",
//         coutry: "India"
// });

//     await sampleListing.save();
//     console.log("Data was saved");
//     res.send("Successful");

// })